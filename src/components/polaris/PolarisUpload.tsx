import {
  Banner,
  DropZone,
  LegacyStack,
  List,
  Spinner,
  Thumbnail,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";

export function PolarisUpload(props: {
  url: string;
  setUrl: (url: string) => void;
  onLoading: (v: boolean) => void;
  isSmall?: boolean;
}) {
  // const { file } = useFirebase();
  const [files, setFiles] = useState<any[]>(props.url ? [props.url] : []);
  const [loading, setLoading] = useState(false);
  const [rejectedFiles, setRejectedFiles] = useState<any[]>([]);
  const hasError = rejectedFiles.length > 0;

  const handleDrop = useCallback(
    (_droppedFiles: File[], acceptedFiles: File[], rejectedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const reader = new FileReader();
        setLoading(true);
        props.onLoading(true);
        reader.onloadend = async () => {
          const base64 = reader.result?.toString().split(",")[1];
          if (base64) {
            const file = acceptedFiles[0];
            const uniqueId = new Date().getTime();
            const extension = file.name.split(".").pop();
            const newFileName = `${uniqueId}.${extension}`;
            const res = await fetch("/api/upload", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                fileName: newFileName,
                fileContent: base64,
              }),
            });

            const data = await res.json();
            setFiles([data.url]);
            props.setUrl(data.url);
            setLoading(false);
            props.onLoading(false);
          }
        };
        reader.readAsDataURL(acceptedFiles[0]);
      }
      setRejectedFiles(rejectedFiles);
    },
    [props]
  );

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <div className="flex h-full flex-col items-center justify-center">
      {files.map((file, index) => (
        <LegacyStack alignment="center" key={index}>
          <Thumbnail size="large" alt={file.name} source={file} />
        </LegacyStack>
      ))}
    </div>
  );

  const uploadedSmallFiles = files.length > 0 && (
    <div className="flex w-[40px] flex-col items-center justify-center">
      {files.map((file, index) => (
        <LegacyStack alignment="center" key={index}>
          <Thumbnail size="small" alt={file.name} source={file} />
        </LegacyStack>
      ))}
    </div>
  );

  const errorMessage = hasError && (
    <Banner title="The following images couldn’t be uploaded:" tone="critical">
      <List type="bullet">
        {rejectedFiles.map((file, index) => (
          <List.Item
            key={index}
          >{`"${file}" is not supported. File type must be .gif, .jpg, .png or .svg.`}</List.Item>
        ))}
      </List>
    </Banner>
  );

  if (props.isSmall) {
    return (
      <div style={{ width: 40, height: 40 }}>
        <DropZone
          accept="image/*"
          type="image"
          onDrop={handleDrop}
          allowMultiple={false}
        >
          {loading && (
            <div className="flex flex-col items-center justify-center">
              <LegacyStack alignment="center">
                <Spinner size="small" />
              </LegacyStack>
            </div>
          )}
          {!loading && files.length === 0 && uploadedFiles}
          {uploadedSmallFiles}
        </DropZone>
      </div>
    );
  }

  return (
    <LegacyStack vertical>
      {errorMessage}
      <DropZone
        accept="image/*"
        type="image"
        onDrop={handleDrop}
        allowMultiple={false}
      >
        {loading && (
          <div className="flex h-full flex-col items-center justify-center">
            <LegacyStack alignment="center">
              <Spinner size="small" />
            </LegacyStack>
          </div>
        )}
        {!loading && uploadedFiles}
        {fileUpload}
      </DropZone>
    </LegacyStack>
  );
}
