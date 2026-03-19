import { useState } from "react"
import axios from "axios"

const ImageAIScanner = () => {
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<any>(null)

  const handleUpload = async () => {
    if (!image) return

    const formData = new FormData()
    formData.append("image", image)

    setLoading(true)

    const res = await axios.post(
      "http://localhost:5000/api/ai/extract-product",
      formData
    )

    setProduct(res.data.data)
    setLoading(false)
  }

  return (
    <div>
      <h2>AI Medicine Scanner</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          e.target.files && setImage(e.target.files[0])
        }
      />

      <button onClick={handleUpload}>
        {loading ? "Processing..." : "Extract Using AI"}
      </button>

      {product && (
        <div>
          <h3>Extracted Data</h3>
          <pre>{JSON.stringify(product, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default ImageAIScanner