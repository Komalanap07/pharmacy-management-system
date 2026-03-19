import { useState } from "react"
import Tesseract from "tesseract.js"
import axios from "axios"

interface ProductData {
  name: string
  batchNo: string
  mfgDate: string
  expiryDate: string
  mrp: string
 Searching?: boolean
  manufacturer: string
}

const ImageProductScanner = () => {
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<ProductData>({
    name: "",
    batchNo: "",
    mfgDate: "",
    expiryDate: "",
    mrp: "",
    manufacturer: ""
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

 const extractText = async () => {
  if (!image) return

  setLoading(true)

  try {
    const result = await Tesseract.recognize(image, "eng", {
      logger: m => console.log(m)
    })

    const text = result.data.text

    console.log("OCR TEXT:", text)

    const nameMatch = text.match(/[A-Z]{3,}\s?\d+/)

    const batchMatch = text.match(/[A-Z]{2,}-[\w/]+/)
    const dateMatches = text.match(/\d{2}\/\d{4}/g)
    const mrpMatch = text.match(/\d+\.\d{2}/)

    setProduct({
      name: nameMatch?.[0] || "",
      batchNo: batchMatch?.[0] || "",
      mfgDate: dateMatches?.[0] || "",
      expiryDate: dateMatches?.[1] || "",
      mrp: mrpMatch?.[0] || "",
      manufacturer: text.includes("Smartway")
        ? "Smartway Wellness Pvt Ltd"
        : ""
    })

  } catch (error) {
    console.error("OCR Error:", error)
  }

  setLoading(false)
}

  const saveProduct = async () => {
    try {
      await axios.post("http://localhost:5000/api/products", product)
      alert("Product Saved Successfully")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Medicine Image</h2>

      <input type="file" accept="image/*" onChange={handleImageChange} />

      <br /><br />

      <button onClick={extractText} disabled={loading}>
        {loading ? "Processing..." : "Extract Details"}
      </button>

      <h3>Extracted Details</h3>

      <input
        placeholder="Product Name"
        value={product.name}
        onChange={e => setProduct({ ...product, name: e.target.value })}
      />

      <input
        placeholder="Batch No"
        value={product.batchNo}
        onChange={e => setProduct({ ...product, batchNo: e.target.value })}
      />

      <input
        placeholder="Mfg Date"
        value={product.mfgDate}
        onChange={e => setProduct({ ...product, mfgDate: e.target.value })}
      />

      <input
        placeholder="Expiry Date"
        value={product.expiryDate}
        onChange={e => setProduct({ ...product, expiryDate: e.target.value })}
      />

      <input
        placeholder="MRP"
        value={product.mrp}
        onChange={e => setProduct({ ...product, mrp: e.target.value })}
      />

      <input
        placeholder="Manufacturer"
        value={product.manufacturer}
        onChange={e => setProduct({ ...product, manufacturer: e.target.value })}
      />

      <br /><br />

      <button onClick={saveProduct}>
        Save To Database
      </button>
    </div>
  )
}

export default ImageProductScanner