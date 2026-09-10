-- Execute once in a NEW Supabase project dedicated to the AIA website.
create table public.aia_editors (user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.aia_editors enable row level security;
create policy editor_self on public.aia_editors for select to authenticated using (user_id = auth.uid());
grant select on public.aia_editors to authenticated;
revoke all on public.aia_editors from anon;
revoke insert, update, delete on public.aia_editors from authenticated;

create table public.aia_content (
 id integer primary key check (id = 1),
 data jsonb not null default '{}'::jsonb check (jsonb_typeof(data) = 'object' and octet_length(data::text) < 500000),
 revision integer not null default 0,
 updated_at timestamptz not null default now()
);
insert into public.aia_content(id) values (1);
alter table public.aia_content enable row level security;
create policy public_read on public.aia_content for select to anon, authenticated using (true);
create policy editor_update on public.aia_content for update to authenticated
 using (exists (select 1 from public.aia_editors where user_id = auth.uid()))
 with check (exists (select 1 from public.aia_editors where user_id = auth.uid()));
grant select on public.aia_content to anon, authenticated;
grant update on public.aia_content to authenticated;
revoke insert, delete on public.aia_content from anon, authenticated;
revoke update on public.aia_content from anon;

create function public.aia_save_content(expected_revision integer, new_data jsonb)
returns integer language plpgsql security invoker set search_path = public as $$
declare next_revision integer;
begin
 if not exists (select 1 from public.aia_editors where user_id = auth.uid()) then
  raise insufficient_privilege using message = 'Editor access required';
 end if;
 update public.aia_content set data = new_data, revision = revision + 1, updated_at = now()
 where id = 1 and revision = expected_revision returning revision into next_revision;
 if next_revision is null then raise sqlstate 'PT409' using message = 'Content changed'; end if;
 return next_revision;
end;
$$;
revoke all on function public.aia_save_content(integer,jsonb) from public, anon;
grant execute on function public.aia_save_content(integer,jsonb) to authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('aia-media','aia-media',true,8388608,array['image/jpeg','image/png','image/webp']);
create policy aia_editor_upload on storage.objects for insert to authenticated
with check (bucket_id = 'aia-media' and exists (select 1 from public.aia_editors where user_id = auth.uid()));
-- No object overwrite/delete permissions: published photos keep working.
-- After creating the owner's email/password user in Authentication > Users:
-- insert into public.aia_editors(user_id) values ('THE_OWNER_USER_UUID');
