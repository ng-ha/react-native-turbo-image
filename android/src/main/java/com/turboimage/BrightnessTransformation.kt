package com.turboimage

import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.ColorMatrix
import android.graphics.ColorMatrixColorFilter
import android.graphics.Paint
import androidx.core.graphics.createBitmap
import coil.size.Size
import coil.transform.Transformation

class BrightnessTransformation(
   private val brightness: Float
) : Transformation {

  override val cacheKey: String = "${BrightnessTransformation::class.java.name}-$brightness"

  override suspend fun transform(input: Bitmap, size: Size): Bitmap {
    val output = createBitmap(input.width, input.height, Bitmap.Config.ARGB_8888)

    val canvas = Canvas(output)
    val paint = Paint()
    paint.isAntiAlias = true

    val matrix = ColorMatrix()
//    matrix.set(ColorMatrix.ARRAY_IDENTITY)
    matrix.setScale(brightness, brightness, brightness, 1f)

    paint.colorFilter = ColorMatrixColorFilter(matrix)

    canvas.drawBitmap(input, 0f, 0f, paint)

    return output
  }
}
