'use client'

import ProductActions from "@modules/products/components/product-actions"
import { Button } from "@medusajs/ui"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { useState } from "react"
import Modal from "@modules/common/components/modal"

const PreviewProductActions = ({ product }: { product: PricedProduct }) => {
  const variant = product.variants[0]

  return (
    <Button 
      onClick={() => {
        // TODO: Implementer add-to-cart når vi har funnet riktig kontekst
        console.log("Add to cart:", variant.id)
      }}
      className="w-full h-10"
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