-- L05: reviewed starting migration for a NEW, EMPTY Supabase course project.
-- Not the full database of the final application. Not run against Supabase here.
-- Transaction fails if tables already exist: review a migration, do not DROP data.
begin;
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, owner_id)
);
create index conversations_owner_idx on public.conversations(owner_id);
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null,
  owner_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user','assistant','tool')),
  content text not null default '',
  parts jsonb not null default '[]'::jsonb,
  status text not null default 'complete' check (status in ('complete','partial','failed')),
  created_at timestamptz not null default now(),
  foreign key (conversation_id, owner_id) references public.conversations(id, owner_id) on delete cascade
);
create index messages_owner_conversation_idx on public.messages(owner_id, conversation_id, created_at);
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
revoke all on table public.conversations, public.messages from anon, authenticated;
grant select, insert, update, delete on table public.conversations, public.messages to authenticated;
create policy conversations_select on public.conversations for select to authenticated using ((select auth.uid()) = owner_id);
create policy conversations_insert on public.conversations for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy conversations_update on public.conversations for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
create policy conversations_delete on public.conversations for delete to authenticated using ((select auth.uid()) = owner_id);
create policy messages_select on public.messages for select to authenticated using ((select auth.uid()) = owner_id);
create policy messages_insert on public.messages for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy messages_update on public.messages for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
create policy messages_delete on public.messages for delete to authenticated using ((select auth.uid()) = owner_id);
commit;
-- Next: test A/B/anon CRUD and foreign conversation IDs using normal sessions.
-- RLS proves ownership constraints, NOT truth or provenance of a message's role.
-- Backend must validate conversation state and rebuild trusted model messages.
