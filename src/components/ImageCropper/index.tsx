import React, { useEffect, useRef } from 'react'
import { Box, Button, Typography } from '@mui/material'

import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop, type Crop } from 'react-image-crop'

import BasicModal from './Modal'
import InputFileUpload from '../InputFileUpload'
import { AxiosResponse } from 'axios'

interface PixelCrop {
  x: number
  y: number
  width: number
  height: number
}

const setCanvasPreview = (image: HTMLImageElement, canvas: HTMLCanvasElement, crop: PixelCrop): void => {
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('No 2d context')
  }

  const pixelRatio = window.devicePixelRatio
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

  ctx.scale(pixelRatio, pixelRatio)
  ctx.imageSmoothingQuality = 'high'
  ctx.save()

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY

  ctx.translate(-cropX, -cropY)
  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.naturalWidth, image.naturalHeight)

  ctx.restore()
}

const dataURLtoFile = (dataUrl: string, filename: string): File => {
  const arr = dataUrl.split(',')
  const matchResult = arr[0].match(/:(.*?);/)
  const mime = matchResult ? matchResult[1] : ''
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

interface ImageCropperProps {
  open: boolean
  onClose: () => void
  onSubmit: (file: any) => Promise<AxiosResponse | undefined>
}

const ASPECT_RATIO = Number(process.env.NEXT_PUBLIC_ASPECT_RATIO) || 1
const MIN_CROP_DIMENSION = Number(process.env.NEXT_PUBLIC_MIN_CROP_DIMENSION) || 200
const MAX_DIMENSION = Number(process.env.NEXT_PUBLIC_MAX_DIMENSION) || 600
const MIN_DIMENSION = Number(process.env.NEXT_PUBLIC_MIN_DIMENSION) || 100

const ImageCropper = ({ onClose, open, onSubmit }: ImageCropperProps) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)

  const [imgSrc, setImgSrc] = React.useState<string | null>(null)
  const [crop, setCrop] = React.useState<Crop | undefined>()
  const [error, setError] = React.useState<string | null>(null)

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.addEventListener('load', () => {
      const imageElement = new Image()
      const imageUrl = reader.result?.toString() || ''
      imageElement.src = imageUrl

      imageElement.addEventListener('load', e => {
        setError(null)
        const { naturalWidth, naturalHeight } = e.currentTarget as HTMLImageElement

        if (naturalWidth > MAX_DIMENSION || naturalHeight > MAX_DIMENSION) {
          setError('A imagem deve ter no máximo 600px de largura e altura.')

          return setImgSrc(null)
        }

        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError('A imagem deve ter no mínimo 100px de largura e altura.')

          return setImgSrc(null)
        }

        setImgSrc(imageUrl)
      })
    })
    reader.readAsDataURL(file)
  }

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    const cropWidthInPercent = (MIN_CROP_DIMENSION / width) * 100

    const crop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthInPercent
      },
      ASPECT_RATIO,
      width,
      height
    )

    const centeredCrop = centerCrop(crop, width, height)
    setCrop(centeredCrop)
  }

  const handleSave = async () => {
    if (imgRef.current && previewCanvasRef.current && crop) {
      setCanvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
      )

      const dataUrl = previewCanvasRef.current.toDataURL()
      const file = dataURLtoFile(dataUrl, 'cropped-image.png')

      await onSubmit(file)
    }
  }

  useEffect(() => {
    if (!open) {
      setImgSrc(null)
      setError(null)
      setCrop(undefined)
    }
  }, [open])

  return (
    <BasicModal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography variant='h6' component='h2'>
          Escolha uma nova imagem
        </Typography>
        <InputFileUpload text='Escolher imagem' accept={'.jpg, .jpeg, .png, .webp'} onChange={onSelectFile} />
      </Box>
      {imgSrc && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <ReactCrop
            crop={crop}
            onChange={newCrop => setCrop(newCrop)}
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img ref={imgRef} src={imgSrc} alt='Upload' onLoad={onImageLoad} style={{ width: '100%' }} />
          </ReactCrop>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2
            }}
          >
            <Button
              variant='contained'
              color='primary'
              onClick={onClose}
              sx={{
                minWidth: 105
              }}
            >
              cancelar
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSave}
              sx={{
                minWidth: 105
              }}
            >
              Salvar
            </Button>
          </Box>
        </Box>
      )}
      {error && (
        <Typography variant='body2' color='error'>
          {error}
        </Typography>
      )}
      <canvas
        ref={previewCanvasRef}
        style={{
          display: 'none'
        }}
      />
    </BasicModal>
  )
}

export default ImageCropper
