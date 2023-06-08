--
-- PostgreSQL database dump
--

-- Dumped from database version 13.9 (Ubuntu 13.9-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.sessions DROP CONSTRAINT IF EXISTS sessions_fk0;
ALTER TABLE IF EXISTS ONLY public.reposts DROP CONSTRAINT IF EXISTS reposts_fk1;
ALTER TABLE IF EXISTS ONLY public.reposts DROP CONSTRAINT IF EXISTS reposts_fk0;
ALTER TABLE IF EXISTS ONLY public.posts DROP CONSTRAINT IF EXISTS posts_fk0;
ALTER TABLE IF EXISTS ONLY public.likes DROP CONSTRAINT IF EXISTS likes_fk1;
ALTER TABLE IF EXISTS ONLY public.likes DROP CONSTRAINT IF EXISTS likes_fk0;
ALTER TABLE IF EXISTS ONLY public.hashtags DROP CONSTRAINT IF EXISTS hashtags_fk0;
ALTER TABLE IF EXISTS ONLY public.follows DROP CONSTRAINT IF EXISTS follows_fk1;
ALTER TABLE IF EXISTS ONLY public.follows DROP CONSTRAINT IF EXISTS follows_fk0;
ALTER TABLE IF EXISTS ONLY public.comments DROP CONSTRAINT IF EXISTS comments_fk1;
ALTER TABLE IF EXISTS ONLY public.comments DROP CONSTRAINT IF EXISTS comments_fk0;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pk;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_email_key;
ALTER TABLE IF EXISTS ONLY public.reposts DROP CONSTRAINT IF EXISTS uq_userid_postid;
ALTER TABLE IF EXISTS ONLY public.follows DROP CONSTRAINT IF EXISTS uq_followerid_followingid;
ALTER TABLE IF EXISTS ONLY public.sessions DROP CONSTRAINT IF EXISTS sessions_token_key;
ALTER TABLE IF EXISTS ONLY public.sessions DROP CONSTRAINT IF EXISTS sessions_pk;
ALTER TABLE IF EXISTS ONLY public.reposts DROP CONSTRAINT IF EXISTS reposts_pk;
ALTER TABLE IF EXISTS ONLY public.posts DROP CONSTRAINT IF EXISTS posts_pk;
ALTER TABLE IF EXISTS ONLY public.likes DROP CONSTRAINT IF EXISTS likes_user_id_post_id_key;
ALTER TABLE IF EXISTS ONLY public.likes DROP CONSTRAINT IF EXISTS likes_pk;
ALTER TABLE IF EXISTS ONLY public.hashtags DROP CONSTRAINT IF EXISTS hashtags_pk;
ALTER TABLE IF EXISTS ONLY public.hashtags DROP CONSTRAINT IF EXISTS hashtags_name_post_id_key;
ALTER TABLE IF EXISTS ONLY public.follows DROP CONSTRAINT IF EXISTS follows_pk;
ALTER TABLE IF EXISTS ONLY public.comments DROP CONSTRAINT IF EXISTS comments_pk;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.sessions ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.reposts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.posts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.likes ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.hashtags ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.follows ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.comments ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.sessions_id_seq;
DROP TABLE IF EXISTS public.sessions;
DROP SEQUENCE IF EXISTS public.reposts_id_seq;
DROP TABLE IF EXISTS public.reposts;
DROP SEQUENCE IF EXISTS public.posts_id_seq;
DROP TABLE IF EXISTS public.posts;
DROP SEQUENCE IF EXISTS public.likes_id_seq;
DROP TABLE IF EXISTS public.likes;
DROP SEQUENCE IF EXISTS public.hashtags_id_seq;
DROP TABLE IF EXISTS public.hashtags;
DROP SEQUENCE IF EXISTS public.follows_id_seq;
DROP TABLE IF EXISTS public.follows;
DROP SEQUENCE IF EXISTS public.comments_id_seq;
DROP TABLE IF EXISTS public.comments;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    comment text NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: follows; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.follows (
    id integer NOT NULL,
    follower_id integer NOT NULL,
    following_id integer NOT NULL
);


--
-- Name: follows_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.follows_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: follows_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.follows_id_seq OWNED BY public.follows.id;


--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtags (
    id integer NOT NULL,
    post_id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hashtags_id_seq OWNED BY public.hashtags.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    post_id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    link text NOT NULL,
    comment text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    title text,
    description text,
    image text
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: reposts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reposts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: reposts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reposts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reposts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reposts_id_seq OWNED BY public.reposts.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token text NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    profile_picture text NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: follows id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follows ALTER COLUMN id SET DEFAULT nextval('public.follows_id_seq'::regclass);


--
-- Name: hashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN id SET DEFAULT nextval('public.hashtags_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: reposts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts ALTER COLUMN id SET DEFAULT nextval('public.reposts_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: follows; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.follows VALUES (1, 3, 2);
INSERT INTO public.follows VALUES (2, 2, 3);
INSERT INTO public.follows VALUES (4, 2, 7);
INSERT INTO public.follows VALUES (5, 2, 5);


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.hashtags VALUES (1, 1, 'teste');
INSERT INTO public.hashtags VALUES (3, 7, 'teste');
INSERT INTO public.hashtags VALUES (4, 7, 'oi');


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.likes VALUES (1, 1, 1);
INSERT INTO public.likes VALUES (79, 13, 2);
INSERT INTO public.likes VALUES (3, 1, 3);
INSERT INTO public.likes VALUES (4, 1, 4);
INSERT INTO public.likes VALUES (80, 15, 5);
INSERT INTO public.likes VALUES (81, 11, 4);
INSERT INTO public.likes VALUES (23, 7, 2);
INSERT INTO public.likes VALUES (24, 6, 2);
INSERT INTO public.likes VALUES (25, 5, 2);
INSERT INTO public.likes VALUES (29, 9, 5);
INSERT INTO public.likes VALUES (30, 6, 5);
INSERT INTO public.likes VALUES (31, 1, 2);
INSERT INTO public.likes VALUES (32, 13, 5);
INSERT INTO public.likes VALUES (33, 7, 5);
INSERT INTO public.likes VALUES (36, 13, 6);
INSERT INTO public.likes VALUES (39, 5, 5);
INSERT INTO public.likes VALUES (50, 15, 4);
INSERT INTO public.likes VALUES (54, 13, 4);
INSERT INTO public.likes VALUES (57, 10, 4);
INSERT INTO public.likes VALUES (58, 9, 4);
INSERT INTO public.likes VALUES (62, 5, 4);
INSERT INTO public.likes VALUES (63, 6, 4);
INSERT INTO public.likes VALUES (66, 7, 4);
INSERT INTO public.likes VALUES (73, 16, 4);


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (1, 2, 'https://github.com/lucasnerism', 'github de um cara medíocre ai', '2023-06-01 01:25:58.267254', '2023-06-01 01:25:58.267254', 'lucasnerism - Overview', 'lucasnerism has 24 repositories available. Follow their code on GitHub.', 'https://avatars.githubusercontent.com/u/94038894?v=4?s=400');
INSERT INTO public.posts VALUES (5, 3, 'https://github.com/lucasnerism', 'Se não vivesse no fuso do japão estaria voando.', '2023-06-03 00:22:24.905831', '2023-06-03 00:22:24.905831', 'lucasnerism - Overview', 'lucasnerism has 24 repositories available. Follow their code on GitHub.', 'https://avatars.githubusercontent.com/u/94038894?v=4?s=400');
INSERT INTO public.posts VALUES (6, 3, 'https://github.com/lucasnerism', 'Se não vivesse no fuso do japão estaria voando.', '2023-06-03 01:57:07.075698', '2023-06-03 01:57:07.075698', 'lucasnerism - Overview', 'lucasnerism has 24 repositories available. Follow their code on GitHub.', 'https://avatars.githubusercontent.com/u/94038894?v=4?s=400');
INSERT INTO public.posts VALUES (7, 3, 'https://github.com/lucasnerism', 'Teste.', '2023-06-03 01:59:12.280417', '2023-06-03 01:59:12.280417', 'lucasnerism - Overview', 'lucasnerism has 24 repositories available. Follow their code on GitHub.', 'https://avatars.githubusercontent.com/u/94038894?v=4?s=400');
INSERT INTO public.posts VALUES (9, 6, 'https://pt.stackoverflow.com/questions/411048/como-criar-uma-nova-branch-no-github', 'tinha dado um erro cabuloso no projeto', '2023-06-04 15:12:44.075712', '2023-06-04 15:12:44.075712', 'stackoverflow', 'conheça o site mais popular entre os devs', 'https://w7.pngwing.com/pngs/305/500/png-transparent-stack-overflow-stack-exchange-computer-programming-software-developer-others-text-stack-logo-thumbnail.png');
INSERT INTO public.posts VALUES (10, 6, 'https://pt.stackoverflow.com/questions/411048/como-criar-uma-nova-branch-no-github', 'nada temo no vale das sombras ao seu lado', '2023-06-04 15:13:44.497326', '2023-06-04 15:13:44.497326', 'stackoverflow o maior', 'conheça o site mais popular entre os devs', 'https://w7.pngwing.com/pngs/164/944/png-transparent-stack-overflow-stack-exchange-computer-icons-icon-design-software-developer-others-angle-text-rectangle-thumbnail.png');
INSERT INTO public.posts VALUES (11, 5, 'https://pt.stackoverflow.com/questions/411048/como-criar-uma-nova-branch-no-github', 'esse post o usuario teste@teste.com vai poder editar', '2023-06-04 18:29:59.093088', '2023-06-04 18:29:59.093088', 'stackoverflow o maior', 'conheça o site mais popular entre os devs', 'https://w7.pngwing.com/pngs/164/944/png-transparent-stack-overflow-stack-exchange-computer-icons-icon-design-software-developer-others-angle-text-rectangle-thumbnail.png');
INSERT INTO public.posts VALUES (13, 5, 'https://stackoverflow.co/teams/', 'link para criar um time no stackoverflow o melhor lugar para testar a edicao de comentario beleza edicao funcionando', '2023-06-05 15:09:16.062117', '2023-06-05 15:16:35.642208', 'Trusted Knowledge Sharing Platform for Technologists: Stack Overflow for Teams - Stack Overflow', 'Stack Overflow for Teams is a secure knowledge sharing platform trusted by the world’s largest community of developers and technologists. We boost team productivity and collaboration through a centralized knowledge base and easy to use, familiar platform.', 'https://stackoverflow.co/img/product/teams/og/teams.png');
INSERT INTO public.posts VALUES (15, 2, 'https://www.youtube.com/watch?v=ClnlNUOwRAg', 'YOHOHOHO! YOHOHOHO! YOHOHOHO! YOHOHOHO!', '2023-06-05 19:11:44.371672', '2023-06-05 19:11:44.371672', 'One piece : Rumbar Kaizoku Bink''s no Sake', 'Bink''s no Sake by Rumbar pirates', 'https://i.ytimg.com/vi/ClnlNUOwRAg/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AHOBoAC4AOKAgwIABABGEIgQihyMA8=&rs=AOn4CLDDL6IrwErp_HQWBq-zqbfcjxpZXA');
INSERT INTO public.posts VALUES (16, 4, 'https://www.youtube.com/watch?v=ClnlNUOwRAg', 'test', '2023-06-07 03:26:59.973782', '2023-06-07 03:26:59.973782', 'One piece : Rumbar Kaizoku Bink''s no Sake', 'Bink''s no Sake by Rumbar pirates', 'https://i.ytimg.com/vi/ClnlNUOwRAg/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AHOBoAC4AOKAgwIABABGEIgQihyMA8=&rs=AOn4CLDDL6IrwErp_HQWBq-zqbfcjxpZXA');


--
-- Data for Name: reposts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.reposts VALUES (1, 7, 13, '2023-06-06 22:24:10.906753');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (3, 2, '4eebe837-bbbb-42ca-835f-93ef5fb02b3e');
INSERT INTO public.sessions VALUES (4, 2, '157ede97-2819-4133-baff-8ecd39ed8bdf');
INSERT INTO public.sessions VALUES (5, 4, '68c74e7b-e8b6-4a04-8dfd-e96b79936a55');
INSERT INTO public.sessions VALUES (6, 4, 'dff896d6-b8cc-4346-9144-c197d68dfc3f');
INSERT INTO public.sessions VALUES (7, 5, 'fd2ea15c-cec3-40d3-837f-6f1b52b7b631');
INSERT INTO public.sessions VALUES (8, 5, '3932330a-b89f-41a4-8b3d-66d2ae65f818');
INSERT INTO public.sessions VALUES (9, 5, '10a1a98a-530c-4aaa-8397-09d157a193b1');
INSERT INTO public.sessions VALUES (10, 5, 'ea3df76c-53ee-43af-97af-9c02da82bb93');
INSERT INTO public.sessions VALUES (11, 5, '704747da-0db3-4eb0-b280-20f4301153ac');
INSERT INTO public.sessions VALUES (12, 5, 'd06f4106-08e2-4ebd-8641-bafcba0e3f44');
INSERT INTO public.sessions VALUES (13, 2, 'c6459ea7-cb41-4878-95f3-499719128088');
INSERT INTO public.sessions VALUES (14, 2, '41812f2c-a397-4b2b-90cb-61c83c3b8b97');
INSERT INTO public.sessions VALUES (15, 2, '03a1ec58-6608-49e0-a03f-d7ffee393d11');
INSERT INTO public.sessions VALUES (16, 2, '157e5ebc-28ee-4a13-b2f6-9d510353282d');
INSERT INTO public.sessions VALUES (18, 5, 'a7c725ae-1652-4f2e-9c63-a8584c3b8a39');
INSERT INTO public.sessions VALUES (19, 5, '2879300a-b32f-4583-b5fe-14171a9f141f');
INSERT INTO public.sessions VALUES (20, 2, '6a96d975-3f15-4e7d-ad84-fd6e0883dc90');
INSERT INTO public.sessions VALUES (21, 5, '99a877f7-07be-4ecb-af17-0dc05f4351eb');
INSERT INTO public.sessions VALUES (22, 5, 'a0876f5c-301b-4f99-bce5-8b0362973ce5');
INSERT INTO public.sessions VALUES (24, 5, '054ae738-62f1-40a7-ad24-2dff53c6a2ef');
INSERT INTO public.sessions VALUES (25, 6, '05c1bbd3-2a4a-41fc-bb94-35ed37b5e14d');
INSERT INTO public.sessions VALUES (26, 5, '004ed8d6-33fb-4527-b5e3-16e97d44a419');
INSERT INTO public.sessions VALUES (27, 2, 'c04df2e1-a1d8-45be-a5a0-eed531a1c661');
INSERT INTO public.sessions VALUES (28, 5, 'c79a76ee-52f0-4b65-9739-6f3ab6a66f5c');
INSERT INTO public.sessions VALUES (29, 5, '253f9a79-fc28-449d-98c7-9df2476de5d4');
INSERT INTO public.sessions VALUES (30, 5, 'f04fbfad-89b1-4c10-ac3c-5f8767cbbae9');
INSERT INTO public.sessions VALUES (31, 5, 'd36e02c8-b342-465b-bb37-6bd98a70d1d0');
INSERT INTO public.sessions VALUES (34, 6, '35a3ba37-496a-421c-81ea-ad6bac28d1ce');
INSERT INTO public.sessions VALUES (37, 6, 'da79f105-f1ed-444f-9aab-fab98276a061');
INSERT INTO public.sessions VALUES (40, 5, '1c2d5226-2099-4608-b03d-b4dc54f1ed8a');
INSERT INTO public.sessions VALUES (42, 6, 'f49e9c69-d9be-4c53-8080-9a22a7899517');
INSERT INTO public.sessions VALUES (45, 4, '5b55b1ca-5e12-43bc-9b18-82197a9dd4c0');
INSERT INTO public.sessions VALUES (49, 2, '5e247cb4-6ef8-4f82-a835-b5ebebf02609');
INSERT INTO public.sessions VALUES (50, 3, '3fbee970-e319-483e-ac0d-3b4e6c8af8ef');
INSERT INTO public.sessions VALUES (51, 7, 'f9551e47-ee3a-4b8f-ba9b-56bc04ca4fb9');
INSERT INTO public.sessions VALUES (52, 7, '993c1000-4c4f-4af2-9c31-09d498b77566');
INSERT INTO public.sessions VALUES (53, 2, 'db2c9412-0d05-46a5-bb1a-198224290d2a');
INSERT INTO public.sessions VALUES (54, 4, '4f7edda5-fa02-42de-a5eb-817e4443c78d');
INSERT INTO public.sessions VALUES (55, 5, '129ebb06-0cf7-47f2-94ca-7f8acf8408cd');
INSERT INTO public.sessions VALUES (56, 5, 'f9931ca1-b504-42e1-a031-957806f482b2');
INSERT INTO public.sessions VALUES (57, 7, '067aed94-69ed-4361-8dea-f756a2d46342');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Nome do usuario', 'email_do_usuário@email.com', '$2b$10$Gbp0MKxd8js.Jb0RdxpERuDCscU3kvajn.qOTL1Tx3g39SScVehQ6', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa-VTAo9eWxJCUiqY5AE16wnTaWJWr49bTTEkMUGsm1A&s');
INSERT INTO public.users VALUES (2, 'Lucas', 'lucas@lucas.com', '$2b$10$EC6XE2bl6F6HMgFM.G6tZ.nhiNfJ.CHITaambce8VJMv985rMDfIS', 'https://pbs.twimg.com/profile_images/3718034393/5be39754b9e832f46db8560f58f325ba_400x400.jpeg');
INSERT INTO public.users VALUES (3, 'kayds', 'kayds@lucas.com', '$2b$10$4kfn.nmSEN00q4IdYD8xbexOfIUoqFF6XjMF/kUvoLT7BWMbr37ci', 'https://pbs.twimg.com/profile_images/3718034393/5be39754b9e832f46db8560f58f325ba_400x400.jpeg');
INSERT INTO public.users VALUES (4, 'lara', 'lara@gmail.com', '$2b$10$udjBSvRM2Vw30F1o3dD3geT0c/wxgzx4s0r46DpbGR9s2CIDFeNja', 'https://w7.pngwing.com/pngs/481/915/png-transparent-computer-icons-user-avatar-woman-avatar-computer-business-conversation-thumbnail.png');
INSERT INTO public.users VALUES (5, 'teste', 'teste@teste.com', '$2b$10$3.7N099W7I9GSN7fagJszOYXiACSBx.JI.CbTwh/STLzJAtJlgq4i', 'https://i.pinimg.com/736x/32/a2/18/32a218b34ceeeee7997fde19df13a3ca.jpg');
INSERT INTO public.users VALUES (6, 'Usuário', 'testando123@testando123.com', '$2b$10$wkYgeLjricootJpcABtFyuarl8OHJFPjVF2QtXP1zZ/2JTXLfZDcG', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Borboleta_transparente_REFON.JPG/200px-Borboleta_transparente_REFON.JPG');
INSERT INTO public.users VALUES (7, 'Dumbo', 'dumbo@lucas.com', '$2b$10$B5e5aOR6Hm1UauJ0Z6Y7YOFxMkVZehB6AdBKtev2SIaNcdHexb8Oi', 'https://scontent.fplu4-1.fna.fbcdn.net/v/t1.6435-9/59350518_2433632230032717_7419493335972184064_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GCcgSrRJb_cAX_ayuk0&_nc_ht=scontent.fplu4-1.fna&oh=00_AfBA-ymi5mz6K8Nr9LFpHEtwOr7NxfUrHUQS1Gj28w17Gg&oe=64A58143');
INSERT INTO public.users VALUES (8, 'Iara', 'lara2@gmail.com', '$2b$10$UqCVxbBpURd/NT.ctOdH3O4QZDUHaswvL4IFFpZW/xrjNyCIPqcPi', 'https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg');


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- Name: follows_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.follows_id_seq', 8, true);


--
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 4, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_id_seq', 81, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 17, true);


--
-- Name: reposts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reposts_id_seq', 1, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 57, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- Name: comments comments_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pk PRIMARY KEY (id);


--
-- Name: follows follows_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_pk PRIMARY KEY (id);


--
-- Name: hashtags hashtags_name_post_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_post_id_key UNIQUE (name, post_id);


--
-- Name: hashtags hashtags_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pk PRIMARY KEY (id);


--
-- Name: likes likes_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pk PRIMARY KEY (id);


--
-- Name: likes likes_user_id_post_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_user_id_post_id_key UNIQUE (user_id, post_id);


--
-- Name: posts posts_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pk PRIMARY KEY (id);


--
-- Name: reposts reposts_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT reposts_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: follows uq_followerid_followingid; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT uq_followerid_followingid UNIQUE (follower_id, following_id);


--
-- Name: reposts uq_userid_postid; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT uq_userid_postid UNIQUE (user_id, post_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: comments comments_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: comments comments_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_fk1 FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: follows follows_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_fk0 FOREIGN KEY (follower_id) REFERENCES public.users(id);


--
-- Name: follows follows_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_fk1 FOREIGN KEY (following_id) REFERENCES public.users(id);


--
-- Name: hashtags hashtags_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_fk0 FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: likes likes_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_fk0 FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: likes likes_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_fk1 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: posts posts_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: reposts reposts_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT reposts_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: reposts reposts_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT reposts_fk1 FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: sessions sessions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

