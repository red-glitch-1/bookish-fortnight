import { login, logout, register } from '@/routes';
import { destroy, edit, index } from '@/routes/posts';
import { store as storeComment } from '@/routes/posts/comments';
import { destroy as destroyComment } from '@/routes/comments';
import { type SharedData } from '@/types';
import { Form, Head, Link, router, usePage, useForm } from '@inertiajs/react';
import { Post } from '@/types/post/post';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function PostsShow({ post }: { post: Post }) {
    const { auth } = usePage<SharedData>().props;
    const [isDeleting, setIsDeleting] = useState(false);
    const logoutForm = useForm();

    return (
        <>
            <Head title="Post">
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
                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-3">
                                <Button variant="outline" asChild>
                                    <Link href={index()}>
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
                                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                            />
                                        </svg>
                                        Back to Posts
                                    </Link>
                                </Button>
                                {auth.user && (auth.user.id === post.user.id || auth.user.role_id === 1) && (
                                    <Button variant="outline" asChild>
                                        <Link href={edit(post.id)}>
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
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            </svg>
                                            Edit Post
                                        </Link>
                                    </Button>
                                )}
                            </div>
                            {auth.user && (auth.user.id === post.user.id || auth.user.role_id === 1) && (
                                <Button
                                    disabled={isDeleting}
                                    onClick={() => {
                                        setIsDeleting(true);
                                        router.visit(destroy(post.id));
                                    }}
                                    variant="destructive"
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
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                    {isDeleting ? 'Deleting...' : 'Delete Post'}
                                </Button>
                            )}
                        </div>

                        {/* Post Card */}
                        <Card className="overflow-hidden">
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                                                {post.user.name.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-xl mb-1">{post.title}</CardTitle>
                                            <CardDescription className="flex items-center gap-2">
                                                <span>by {post.user.name}</span>
                                                <Badge variant="outline" className="text-xs">
                                                    {new Date(post.created_at).toLocaleDateString()}
                                                </Badge>
                                            </CardDescription>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-sm max-w-none dark:prose-invert">
                                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                        {post.content}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Comments Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    Comments
                                    <Badge variant="secondary" className="ml-2">
                                        {post.comments.length}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {post.comments.length > 0 ? (
                                    post.comments.map((comment, index) => (
                                        <div key={comment.id}>
                                            <div className="flex items-start space-x-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                                                        {comment.user ? comment.user.name.charAt(0).toUpperCase() : 'A'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-sm font-medium">
                                                            {comment.user ? comment.user.name : 'Anonymous'}
                                                        </span>
                                                        <Badge variant="outline" className="text-xs">
                                                            {new Date(comment.created_at).toLocaleDateString()}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        {comment.comment}
                                                    </p>
                                                </div>
                                                {auth.user && (auth.user.id === (comment.user ? comment.user.id : null) || auth.user.role_id === 1 || auth.user.id === post.user.id) && (
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => router.visit(destroyComment(comment.id))}
                                                        className=""
                                                    >
                                                        Delete
                                                    </Button>
                                                )}
                                            </div>
                                            {index < post.comments.length - 1 && <Separator className="mt-4" />}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Add Comment Form */}
                        {auth.user && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Add a Comment</CardTitle>
                                    <CardDescription>
                                        Share your thoughts on this post
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Form method="post" action={storeComment(post.id)} className="space-y-4">
                                        <Textarea
                                            required
                                            rows={4}
                                            name="comment"
                                            placeholder="Write your comment here..."
                                            className="resize-none"
                                        />
                                        <div className="flex justify-end">
                                            <Button type="submit" className="w-full sm:w-auto">
                                                Post Comment
                                            </Button>
                                        </div>
                                    </Form>
                                </CardContent>
                            </Card>
                        )}
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div >
        </>
    );
}
