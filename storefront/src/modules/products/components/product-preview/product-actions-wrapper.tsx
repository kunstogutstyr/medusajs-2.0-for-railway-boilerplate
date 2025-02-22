'use client'

import ProductActions from "@modules/products/components/product-actions"
import { Button } from "@medusajs/ui"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { useState } from "react"
import Modal from "@modules/common/components/modal"
import { addToCart } from "@lib/data/cart"
import { useParams } from "next/navigation"

const PreviewProductActions = ({ product }: { product: PricedProduct }) => {
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string
  const variant = product.variants[0]

  const handleAddToCart = async () => {
    if (!variant) return
    
    setIsAdding(true)
    try {
      await addToCart({
        variantId: variant.id,
        quantity: 1,
        countryCode,
      })
    } catch (err) {
      console.error(err)
    }
    setIsAdding(false)
  }

  return (
    <Button 
      onClick={handleAddToCart}
      className="w-full h-10"
      isLoading={isAdding}
    >
      Add to cart
    </Button>
  )
}
export default function ProductActionsWrapper({
  product,
}: {
  product: PricedProduct
}) {
  const [showModal, setShowModal] = useState(false)
  
  const hasVariants = product.variants.length > 1

  if (!hasVariants) {
    return <PreviewProductActions product={product} />
  }

  return (
    <>
      <Button 
        onClick={() => setShowModal(true)}
        className="w-full h-10"
      >
        Velg variant
      </Button>
      
      <Modal isOpen={showModal} close={() => setShowModal(false)}>
        <Modal.Title>{product.title}</Modal.Title>
        <Modal.Body>
          <ProductActions product={product} />
        </Modal.Body>
      </Modal>
    </>
  )
}