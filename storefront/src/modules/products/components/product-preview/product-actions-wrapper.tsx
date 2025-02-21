'use client'

import ProductActions from "@modules/products/components/product-actions"
import { HttpTypes } from "@medusajs/types"

export default function ProductActionsWrapper({
  product,
}: {
  product: HttpTypes.StoreProduct
}) {
  return <ProductActions product={product} />
}