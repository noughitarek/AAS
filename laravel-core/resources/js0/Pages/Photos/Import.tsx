import { PageProps } from "@/types";
import Webmaster from '@/Layouts/Webmaster';
import { Head, Link, useForm, router } from "@inertiajs/react";
import Page from "@/Base-components/Page";
import { Button } from "@headlessui/react";
import Grid from "@/Base-components/Grid";
import { toast } from 'react-toastify';
import { useState } from "react";
import CustomTextarea from "@/Base-components/Forms/CustomTextarea";
import CustomTextInput from "@/Base-components/Forms/CustomTextInput";

interface VideosGroupForm{
    name: string;
    description: string;
    videos: File[][];
}

const CreateVideo: React.FC<PageProps> = ({auth, menu}) => {
    const [creating, setCreating] = useState(false)
    const videosGroupForm = useForm<VideosGroupForm>({
        name: '',
        description: '',
        videos: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, type, value, files } = e.target as HTMLInputElement;
        if (type === 'file' && files) {
            const newFiles = Array.from(files);
            videosGroupForm.setData((prevData: VideosGroupForm) => {
                const updatedVideos = [...prevData.videos];
                updatedVideos[parseInt(name)] = newFiles;
                return { ...prevData, videos: updatedVideos };
            });
        } else {
            videosGroupForm.setData(name as keyof VideosGroupForm, value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        videosGroupForm.post(route('photos.import.save'), {
            forceFormData: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                toast.success('Group of videos has been created successfully');
                router.get(route('photos.index'));
            },
            onError: (error) => {
                toast.error('Error creating the group of videos');
                console.error('Error:', error);
            },
            onFinish: () => {
                setCreating(false);
            }
        });
    }
    const moreVideos: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        videosGroupForm.setData(prevData => ({
            ...prevData,
            videos: [...prevData.videos, []]
        }));
    };

    const removeVideos = (index: number) => {
        videosGroupForm.setData(prevData => ({
            ...prevData,
            videos: prevData.videos.filter((_, i) => i !== index),
        }));
    };
    const handleVideoChange = (index: number, files: FileList) => {
        const updatedVideos = [...videosGroupForm.data.videos];
        updatedVideos[index] = Array.from(files);
        videosGroupForm.setData('videos', updatedVideos);
    };
    const moreButton = (<Button className="btn btn-primary" onClick={moreVideos}>More</Button>)
    const saveButton = <Button className="btn btn-primary" disabled={creating} onClick={handleSubmit}>{creating?"Creating":"Create"}</Button>
    return (<>
        <Head title="Create a group of videos" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<>
                <li className="breadcrumb-item" aria-current="page"><Link href={route('photos.index')}>Videos</Link></li>
                <li className="breadcrumb-item" aria-current="page">Groups</li>
                <li className="breadcrumb-item active" aria-current="page">Create</li>
            </>}
        >
        <Page title="Create a group of videos" header={<></>}>
            <Grid title="Groups information">
                <CustomTextInput title="Name" value={videosGroupForm.data.name} name='name' description='Enter the name of the group' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                <CustomTextarea title="Description" value={videosGroupForm.data.description} name='description' description='Enter the description of the group' required={false} handleChange={handleChange} instructions='Not required'/>
                
            </Grid>
            <Grid title="Groups videos" header={moreButton}>
                {videosGroupForm.data.videos.map((video, index)=>(
                <div key={index} className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                    <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                            <div className="flex items-center">
                                <div className="font-medium">Video {index + 1}</div>
                                <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                    Required
                                </div>
                            </div>
                            <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                description
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-3 xl:mt-0 flex-1">
                        <div className="w-full mt-3 xl:mt-2 flex-1">
                            <input
                                type="file"
                                accept="video/*"
                                required
                                className="form-control"
                                onChange={(e) => {
                                    if (e.target.files) {
                                        handleVideoChange(index, e.target.files);
                                    }
                                }}
                                multiple={true}
                            />
                            <div className="form-help text-right mt-2">Video</div>
                        </div>
                    </div>
                    <div className="mt-3 xl:mt-0 ms-2">
                        <Button className='btn btn-primary' onClick={() => removeVideos(index)}>-</Button>
                    </div>
                </div>
                ))}
                {moreButton}
            </Grid>
            <br/>
            {saveButton}
        </Page>

        </Webmaster>
    </>)
}
export default CreateVideo;