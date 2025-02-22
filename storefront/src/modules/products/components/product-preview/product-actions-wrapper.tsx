'use client'

import ProductActions from "@modules/products/components/product-actions"
import { Button } from "@medusajs/ui"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { useState } from "react"
import Modal from "@modules/common/components/modal"

export default function ProductActionsWrapper({
  product,
}: {
  product: PricedProduct
}) {
  const [showModal, setShowModal] = useState(false)
  
  // Sjekk om produktet har varianter
  const hasVariants = product.variants.length > 1

  if (!hasVariants) {
    // Hvis ingen varianter, vis bare kjøpsknappen
    return <ProductActions product={product} />
  }

  // Hvis produktet har varianter, vis "Velg variant" knapp og modal
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