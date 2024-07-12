package com.turboimage.decoder

import coil.decode.DecodeResult
import coil.decode.Decoder
import coil.decode.ImageSource
import com.linecorp.apng.ApngDrawable
import kotlinx.coroutines.runInterruptible

class APNGDecoder(private val source: ImageSource) : Decoder {

  override suspend fun decode() = runInterruptible {
    val filePath = source.file().toString()
    val isAPNG = ApngDrawable.isApng(filePath)

    if (isAPNG) {
      DecodeResult(drawable = ApngDrawable.decode(filePath), isSampled = false)
    } else {
      null
    }
  }
}
