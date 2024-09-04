"use client";

import { useState, useTransition } from "react";

import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";

import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import Dropzone, { FileRejection } from "react-dropzone";
import { useToast } from "@/components/hooks/use-toast";

const Page = () => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const router = useRouter();
  const { toast } = useToast();

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`);
      });
    },
    onUploadProgress(p) {
      setUploadProgress(p);
    },
  });

  const onDropRejected = (rejectedFile: FileRejection[]) => {
    const [file] = rejectedFile;
    setIsDragOver(false);

    toast({
      title: `${file.file.type} type is not supported`,
      description: "please choose png, jpg",
      variant: "destructive",
    });
  };

  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: undefined });

    setIsDragOver(false);
  };

  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={cn(
        "relative my-16 flex h-full w-full flex-1 flex-col items-center justify-center rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl",
        {
          "bg-blue-900/10 ring-blue-900/25": isDragOver,
        },
      )}
    >
      <div className="felx-1 relative flex w-full flex-col items-center justify-center"></div>
      <Dropzone
        onDropAccepted={onDropAccepted}
        onDropRejected={onDropRejected}
        accept={{
          "image/png": [".png"],
          "image/jpeg": [".jpeg"],
          "image/jpg": [".jpg"],
        }}
        onDragEnter={() => setIsDragOver(true)}
        onDragLeave={() => setIsDragOver(false)}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            className="flex h-full w-full flex-1 flex-col items-center justify-center"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragOver ? (
              <MousePointerSquareDashed className="text-zinc-500mb-2 h-6 w-6" />
            ) : isUploading || isPending ? (
              <Loader2 className="mb-2 h-6 w-6 animate-spin text-zinc-500" />
            ) : (
              <Image className="h-6 w-6 text-zinc-500" />
            )}

            <div className="mb-2 flex flex-col justify-center text-sm text-zinc-700">
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <p>Uploading...</p>
                  <Progress
                    value={uploadProgress}
                    className="mt-2 h-2 w-40 bg-gray-300"
                  />
                </div>
              ) : isPending ? (
                <div className="flex flex-col items-center">
                  <p>Redirecting, please wait...</p>
                </div>
              ) : isDragOver ? (
                <p>
                  <span className="font-semibold">Drop file</span>
                  {""}
                  to upload
                </p>
              ) : (
                <p>
                  <span className="click to upload">Drop file</span>
                  {""}
                  or drag and drop
                </p>
              )}
            </div>
            {isPending ? null : (
              <p className="text-xs text-zinc-500"> PNG, JPG, JPEG</p>
            )}
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default Page;
