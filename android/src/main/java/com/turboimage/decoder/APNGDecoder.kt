package com.turboimage.decoder

import coil.ImageLoader
import coil.decode.DecodeResult
import coil.decode.Decoder
import coil.decode.ImageSource
import coil.fetch.SourceResult
import coil.request.Options
import com.github.penfeizhou.animation.apng.APNGDrawable
import com.linecorp.apng.ApngDrawable
import kotlinx.coroutines.runInterruptible

class APNGDecoder(private val source: ImageSource) : Decoder {

override suspend fun decode()= runInterruptible {
  val filePath = source.file().toString()
  // url on disk
  val drawable = if(filePath.contains("image_cache")){
    APNGDrawable.fromFile(filePath)
  } else {
    // url on memory
    ApngDrawable.decode(filePath)
  }
  DecodeResult(drawable = drawable, isSampled = false)
}
   class Factory : Decoder.Factory {

     override fun create(
       result: SourceResult,
       options: Options,
       imageLoader: ImageLoader,
    ): Decoder? {
       val filePath = result.source.file().toString()
       val isAPNG = ApngDrawable.isApng(filePath)
      if (!isAPNG) {
        return null
      }
      return APNGDecoder(
        source = result.source,
      )
    }

  }


}
