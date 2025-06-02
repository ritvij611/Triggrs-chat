import { Plus, X, File, FileText, Image } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useFileUpload } from '../../hooks/useFileUpload';
import { toast } from 'sonner';
import { useFetchUploadedFiles } from '../../hooks/useFetchUploadedFiles';

export const DocumentUploader = ({companyID, isOpen, onClose, setSelectedPhoto, selectedPhoto, setSelectedDoc, selectedDoc, photos, setPhotos, docs, setDocs }) => {
  const [activeTab, setActiveTab] = useState('photos');

  const { uploadResponse, isUploadLoading, uploadError, handleUpload, cancelUpload } = useFileUpload();
  const { allFiles, totalFiles, loadingFiles, fileError, fetchFiles, cancelFilesOperation } = useFetchUploadedFiles();
  const [loadPhotos, setLoadPhotos] = useState(true);
  const [loadDocs, setLoadDocs] = useState(true);
  const [uploadPhotos, setUploadPhotos] = useState(false);
  const [uploadDocs, setUpLoadDocs] = useState(false);

  const totalPhotosRef = useRef(0);
  const totalDocsRef = useRef(0);

  const fileInputRef = useRef(null);
  const photoInputRef = useRef(null);

  useEffect(() => {
      if(uploadResponse?.status === 200){
        toast.success("Media Uploaded Successfully");
        const upload = uploadResponse.upload
        if(upload.category === "image"){
          setUploadPhotos(false);
          setPhotos(prev => [upload, ...prev]);
          setSelectedPhoto(upload);
        }
        else if(upload.category === "document"){
          setUpLoadDocs(false);
          setDocs(prev => [upload, ...prev]);
          setSelectedDoc(upload);
        }
      } else if(uploadError){
        setUploadPhotos(false);
        setUpLoadDocs(false);
        toast.error(uploadError);
      }
    },[uploadResponse,uploadError]);

    useEffect(()=>{
    if (!loadPhotos) return;
    const fetch = async() => {
      if(companyID){
        await fetchFiles({
          companyID,
          category: "image",
          limit: 10,
          index: Math.floor(photos.length / 10),
        });
      }  
    };

    fetch();
  },[loadPhotos]);

  useEffect(()=>{
    if (!loadDocs) return;
    const fetch = async() => {
      if(companyID){
        await fetchFiles({
          companyID,
          category: 'image',
          limit: 10,
          index: Math.floor(docs.length / 10),
        });
      }  
    };

    fetch();
  },[loadDocs]);

  useEffect(() => {
    if(allFiles?.category == 'image')setLoadPhotos(false);
    if(allFiles?.category == 'document')setLoadDocs(false);
    if (allFiles?.files) {
      if(allFiles.category === 'image'){
        totalPhotosRef.current = totalFiles;
        setPhotos((prev) => {
          const existingPhotoIDs = new Set(prev.map(p => p?._id));
          const newUniquePhotos = allFiles?.files?.filter(
            p => !existingPhotoIDs.has(p?._id)
          );
          return [...prev, ...newUniquePhotos]
        });
        setLoadPhotos(false);
      } else if(allFiles.category === 'document'){
        totalDocsRef.current = totalFiles;
        setDocs((prev) => {
          const existingDocIDs = new Set(prev.map(p => p?._id));
          const newUniqueDocs = allFiles?.files?.filter(
            p => !existingDocIDs.has(p?._id)
          );
          return [...prev, ...newUniqueDocs]
        });
        setLoadDocs(false);
      }
    } else if (fileError) {
      toast.error(fileError);
    }
  }, [allFiles, fileError]);


  const onFileChange = async (e, category)=>{
      const file = e.target.files[0];
      const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'application/pdf'];

      if (!file) {
        toast.error(`Please select an image.`);
        return;
      }

      if (!allowedFileTypes.includes(file.type)) {
        toast.error('Invalid file format. Only JPEG, PNG, JPG, PDF, or MP4 are allowed.');
        return;
      }

      const maxValidSize = 4*1024*1024;

      if (file.size > maxValidSize) {
        toast.error(`File size exceeds the limit. Max allowed size for this type is ${maxValidSize / (1024 * 1024)}MB.`);
        return;
      }

      try {
        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");
        if(category==='image')setUploadPhotos(true);
        if(category==='document')setUpLoadDocs(true);
        await handleUpload({
          companyID,
          base64,
          fileName: file.name,
          fileType: file.type,
          category
        });

      } catch (error) {
        console.error('Upload failed:', error);
        toast.error('Failed to upload file. Please try again.');
        setUpLoadDocs(false);
        setUploadPhotos(false);
      }
  }

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <File className="w-8 h-8 text-red-500" />;
      case 'doc': return <FileText className="w-8 h-8 text-blue-500" />;
      case 'excel': return <File className="w-8 h-8 text-green-500" />;
      case 'ppt': return <File className="w-8 h-8 text-orange-500" />;
      default: return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('photos')}
          className={`flex-1 flex items-center justify-center py-3 px-4 ${
            activeTab === 'photos' 
              ? 'text-green-600 border-b-2 border-green-600 bg-green-50' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Image className="w-5 h-5 mr-2" />
          Photos
        </button>
        <button
          onClick={() => setActiveTab('docs')}
          className={`flex-1 flex items-center justify-center py-3 px-4 ${
            activeTab === 'docs' 
              ? 'text-green-600 border-b-2 border-green-600 bg-green-50' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <FileText className="w-5 h-5 mr-2" />
          Documents
        </button>
      </div>

      {/* Content Area */}
      <div className="h-64 overflow-y-auto">
        {activeTab === 'photos' ? (
          <div className="p-4"
            onScroll={(e) => {
            const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
            if (scrollHeight - scrollTop <= clientHeight + 10 && photos.length < totalPhotosRef.current) {
              // User has scrolled to the bottom (or near)
              setLoadPhotos(true);
            }
          }}
          >
            <div className="grid grid-cols-6 gap-2">
              {/* Upload new photo option */}
              <div
                onClick={() => photoInputRef.current?.click()}
                className={"aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors" + `${uploadPhotos ? 'cursor-progress':''}`}
              >
                {uploadPhotos ? (
                  <div className="p-3 flex justify-center">
                    <span className="w-6 h-6 mr-2 animate-spin rounded-full border-2 border-gray-300 border-t-transparent inline-block"></span>
                  </div>
                ) : (
                  <>
                    <Plus className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500 text-center">Add Photo</span>
                  </>
                )}
              </div>
              
              {/* Existing photos */}
              {photos.map((photo) => (
                <div
                  key={photo?._id}
                  onClick={() => {
                    setSelectedPhoto(photo);
                    setSelectedDoc({});
                  }}
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity ${selectedPhoto?._id === photo?._id ? 'border-4 border-green-500':'border-0'}`}
                >
                  <img
                    src={photo.link}
                    alt={photo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {/* Loading Spinner */}
            {loadPhotos && (
              <div className="p-3 flex justify-center">
                <span className="w-6 h-6 mr-2 animate-spin rounded-full border-2 border-gray-300 border-t-transparent inline-block"></span>
              </div>
            )}
            </div>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {onFileChange(e, 'image')}}
              className="hidden"
            />
          </div>
        ) : (
          <div className="p-4"
            onScroll={(e) => {
            const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
            if (scrollHeight - scrollTop <= clientHeight + 10 && docs.length < totalDocsRef.current) {
              // User has scrolled to the bottom (or near)
              setLoadDocs(true);
            }
          }}
          >
            {/* Upload new document option */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center p-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-colors mb-3"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Plus className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-700">Upload Document</div>
                <div className="text-sm text-gray-500">PDF, DOC, XLS, PPT</div>
              </div>
            </div>

            {/* Existing documents */}
            <div className="space-y-2">
              {docs.map((doc) => (
                <div
                  key={doc?._id}
                  onClick={() => {
                    setSelectedPhoto({});
                    setSelectedDoc(doc);
                }}
                  className="flex items-center p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="mr-3">
                    {getFileIcon(doc.type)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 truncate">{doc.name}</div>
                    <div className="text-sm text-gray-500">{doc.size}</div>
                  </div>
                </div>
              ))}
              {/* Loading Spinner */}
            {loadDocs && (
              <div className="p-3 flex justify-center">
                <span className="w-6 h-6 mr-2 animate-spin rounded-full border-2 border-gray-300 border-t-transparent inline-block"></span>
              </div>
            )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              onChange={(e) => {onFileChange(e, 'document')}}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
      >
        <X className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
};