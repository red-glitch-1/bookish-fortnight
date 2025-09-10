import { login, logout, register } from '@/routes';
import { index, show, store, update } from '@/routes/posts';
import { type SharedData } from '@/types';
import { Form, Head, Link, router, usePage, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Post } from '@/types/post/post';

export default function PostsEdit({ post }: { post: Post }) {
    const { auth } = usePage<SharedData>().props;
    const logoutForm = useForm();

    return (
        <>
            <Head title="Create Post">
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
                        {/* Back Button */}
                        {auth.user && (
                            <div className="flex items-center">
                                <Button variant="outline" asChild>
                                    <Link href={show(post.id)}>
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
                                        Back to Post
                                    </Link>
                                </Button>
                            </div>
                        )}

                        <Card className="overflow-hidden">
                            <CardHeader className="text-center pb-6">
                                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <svg
                                        className="w-8 h-8 text-primary"
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
                                </div>
                                <CardTitle className="text-2xl">Edit Post</CardTitle>
                                <CardDescription className="text-base">
                                    Update your post content and make it even better
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form method="post" action={update(post.id)} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-sm font-medium">
                                            Post Title
                                        </Label>
                                        <Input
                                            id="title"
                                            required
                                            type="text"
                                            name="title"
                                            placeholder="Enter a compelling title for your post..."
                                            defaultValue={post.title}
                                            className="text-base"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="content" className="text-sm font-medium">
                                            Post Content
                                        </Label>
                                        <Textarea
                                            id="content"
                                            required
                                            rows={8}
                                            name="content"
                                            placeholder="Write your post content here. Share your thoughts, ideas, or experiences..."
                                            defaultValue={post.content}
                                            className="resize-none text-base leading-relaxed"
                                        />
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        <Button
                                            type="submit"
                                            className="min-w-[140px]"
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
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            Update Post
                                        </Button>
                                    </div>
                                </Form>
                            </CardContent>
                        </Card>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
