import { joinClass } from "@/utils/common";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, ComponentPropsWithRef, forwardRef, useEffect, useState } from 'react'
import Image from "next/image";

export interface FileInputProps extends ComponentPropsWithRef<'input'>{
   isLoading?: boolean 
   isDisabled?: boolean 
   isInvalid?: boolean 
   isValid?: boolean 
   onChangeFile?: (val: File | undefined) => void
   onRemove?: () => void 
   preview?: boolean 
   maxSize?: number 
   allowedTypes?: string[]
   ratio?: string 
   aspectCrop?: string 
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
   (
      {
         className,
         isInvalid,
         onChange,
         onChangeFile,
         onRemove,
         preview,
         maxSize = 5,
         allowedTypes = ['png', 'jpeg', 'jpg', 'webp'],
         ratio = 'aspect-[2/1]',
         aspectCrop,
         ...props 
      },
      ref 
   ) => {
      const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [selectedImage, setSelectedImage] = useState<string | undefined>('')
    const [modal, setModal] = useState<{
      active: string | null
      data: any
      event: any
    }>({
      active: null,
      data: null,
      event: null,
    })

   //  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
   //    const file = event.target.files?.[0]

   //    // Validation for type
   //    let accepted = false
   //    allowedTypes.map(type => {
   //      if (file && file.type.includes(type)) accepted = true
   //    })

   //    if (!accepted) {
   //      toast.error(`Ekstensi file tidak sesuai`)
   //      return
   //    }

   //    // Validation for size
   //    if (file && file.size > maxSize * 1024 * 1024) {
   //      toast.error(`Maksimal size ${maxSize} mb`)
   //      return
   //    }

   //    if (modalPreview) {
   //      setModal({
   //        active: 'modal-preview',
   //        data: file,
   //        event,
   //      })
   //    } else {
   //      if (preview) setSelectedImage(event.target.value)
   //      if (onChange) onChange(event)
   //      if (onChangeFile && file) onChangeFile(file)
   //      if (file) {
   //        previewFile(file)
   //      }
   //    }
   //  }

    const previewFile = (file: File | null) => {
      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          setPreviewImage(reader.result as string)
        }
      }
    }

    useEffect(() => {
      if (props.value) {
        previewFile(props.value as any)
      }
    }, [props.value])

    return (
      <div>
        {/* {modalPreview === 'product' && (
          <ModalPreviewProduct
            id="modal-preview"
            isShowing={modal.active}
            hide={() => setModal({...modal, active: null, data: null})}
            data={modal.data}
            event={modal.event}
            refetch={() => null}
            onSuccess={(event, file) => {
              if (preview) setSelectedImage(event.target.value)
              if (onChange) onChange(event)
              if (onChangeFile && file) onChangeFile(file)
              if (file) {
                previewFile(file)
              }
            }}
          />
        )}
        {modalPreview === 'banner' && (
          <ModalPreviewBanner
            id="modal-preview"
            isShowing={modal.active}
            hide={() => setModal({...modal, active: null, data: null})}
            data={modal.data}
            event={modal.event}
            refetch={() => null}
            aspectCrop={aspectCrop}
            onSuccess={(event, file) => {
              if (preview) setSelectedImage(event.target.value)
              if (onChange) onChange(event)
              if (onChangeFile && file) onChangeFile(file)
              if (file) {
                previewFile(file)
              }
            }}
          />
        )} */}
        <label htmlFor={props.name} className="cursor-pointer">
          {/* <input
            name={props?.name}
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            ref={ref}
            id={props.name}
            className="hidden"
            value={preview ? selectedImage : ''}
            autoComplete="off"
          /> */}
          {preview && previewImage ? (
            <div
              className={joinClass(
                'overflow-clip rounded-xl relative preview-img cursor-pointer',
                ratio
              )}
            >
              <Image
                src={previewImage}
                alt="preview"
                className="object-cover"
                fill
              />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={e => {
                  e.stopPropagation()
                  setPreviewImage(null)
                  setSelectedImage('')
                  if (onChangeFile) onChangeFile(undefined)
                  onRemove ? onRemove() : {}
                }}
              />
            </div>
          ) : (
            <div
              className={joinClass(
                'rounded-xl border border-dashed text-center p-3 flex flex-col items-center justify-center',
                isInvalid ? 'border-error' : 'border-gray-300',
                ratio,
                className
              )}
            >
              <FontAwesomeIcon
                icon={faUpload}
                className="text-2xl text-gray-400 mb-3"
              />
              <h6 className="text-xs font-bold text-[#777777]">
                Upload foto di sini
              </h6>
              <p className="text-xs font-medium text-[#777777] !flex-grow-0">
                Maksimal {maxSize}MB
              </p>
            </div>
          )}
        </label>
      </div>
    )
   }
)
