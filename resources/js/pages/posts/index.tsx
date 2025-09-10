import { login, logout, register } from '@/routes';
import { create, show } from '@/routes/posts';
import { type SharedData } from '@/types';
import { Form, Head, Link, router, usePage, useForm } from '@inertiajs/react';
import { Post } from '@/types/post/post';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function PostsIndex({ posts }: { posts: Post[] }) {
    const { auth } = usePage<SharedData>().props;
    const logoutForm = useForm();

    return (
        <>
            <Head title="Posts">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Button
                                    variant="outline"
                                    onClick={() => logoutForm.post('/logout')}
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    Logout
                                </Button>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="w-full max-w-[335px] lg:max-w-4xl space-y-6">
                        {/* Page Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
                                <p className="text-muted-foreground mt-1">
                                    {posts.length === 0
                                        ? "No posts yet"
                                        : `${posts.length} post${posts.length === 1 ? '' : 's'} available`
                                    }
                                </p>
                            </div>
                            {auth.user && (
                                <Button asChild>
                                    <Link href={create()}>
                                        Create Post
                                    </Link>
                                </Button>
                            )}
                        </div>

                        {/* Posts Grid */}
                        {posts.length > 0 ? (
                            <div className="space-y-4">
                                {posts.map((post, index) => (
                                    <div key={post.id}>
                                        <Card
                                            className="group cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                                            onClick={() => router.visit(show(post.id))}
                                        >
                                            <CardHeader className="pb-3">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <Avatar className="h-10 w-10">
                                                            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                                                                {post.user.name.charAt(0).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1 min-w-0">
                                                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                                                {post.title}
                                                            </CardTitle>
                                                            <CardDescription className="flex items-center gap-2 mt-1">
                                                                <span>by {post.user.name}</span>
                                                                <Badge variant="outline" className="text-xs">
                                                                    {new Date(post.created_at).toLocaleDateString()}
                                                                </Badge>
                                                            </CardDescription>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="secondary" className="text-xs">
                                                            {post.comments.length} comment{post.comments.length === 1 ? '' : 's'}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-muted-foreground leading-relaxed line-clamp-3">
                                                    {post.content}
                                                </p>
                                                <div className="mt-3 flex items-center text-xs text-muted-foreground">
                                                    <span>Click to read more</span>
                                                    <div className="ml-auto group-hover:translate-x-1 transition-transform">
                                                        →
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        {index < posts.length - 1 && <Separator className="my-6" />}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <Card className="text-center py-12">
                                <CardContent>
                                    <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                                        <svg
                                            className="w-12 h-12 text-muted-foreground"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Be the first to share something with the community!
                                    </p>
                                    {auth.user ? (
                                        <Button asChild>
                                            <Link href={create()}>
                                                Create your first post
                                            </Link>
                                        </Button>
                                    ) : (
                                        <div className="space-y-2">
                                            <p className="text-sm text-muted-foreground">
                                                You need to be logged in to create posts
                                            </p>
                                            <div className="flex gap-2 justify-center">
                                                <Button variant="outline" asChild>
                                                    <Link href={login()}>
                                                        Log in
                                                    </Link>
                                                </Button>
                                                <Button variant="outline" asChild>
                                                    <Link href={register()}>
                                                        Register
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
