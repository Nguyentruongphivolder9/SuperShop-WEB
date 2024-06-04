export default function Cart() {
  return <div>Cart</div>
}

// import { useMutation, useQuery } from '@tanstack/react-query'
// import { useContext, useEffect, useMemo } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import purchaseApi from 'src/apis/purchase.api'
// import Button from 'src/components/Button'
// import QuantityController from 'src/components/QuantityController'
// import path from 'src/constants/path'
// import { purchasesStatus } from 'src/constants/purchase'
// import { Purchase } from 'src/types/purchase.type'
// import { formatCurrency, generateNameId } from 'src/utils/utils'
// import { produce } from 'immer'
// import keyBy from 'lodash/keyBy'
// import { toast } from 'react-toastify'
// import { AppContext } from 'src/contexts/app.context'
// import noProduct from 'src/assets/images/no-product.png'

// export default function Cart() {
//   const { extendedPurchase, setExtendedPurchase } = useContext(AppContext)

//   const { data: purchasesInCartData, refetch } = useQuery({
//     queryKey: ['purchases', { status: purchasesStatus.inCart }],
//     queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
//   })
//   const updatePurchaseMutation = useMutation({
//     mutationFn: purchaseApi.updatePurchase,
//     onSuccess: () => {
//       refetch()
//     }
//   })
//   const buyProductMutation = useMutation({
//     mutationFn: purchaseApi.buyProduct,
//     onSuccess: (data) => {
//       refetch()
//       toast.success(data.data.message, {
//         position: 'top-center',
//         autoClose: 2000
//       })
//     }
//   })
//   const deletePurchaseMutation = useMutation({
//     mutationFn: purchaseApi.deletePurchase,
//     onSuccess: () => {
//       refetch()
//     }
//   })
//   const location = useLocation()
//   const chosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId
//   const purchasesInCart = purchasesInCartData?.data.data
//   const isAllChecked = useMemo(() => extendedPurchase?.every((purchase) => purchase.checked), [extendedPurchase])
//   const checkedPurchase = useMemo(() => extendedPurchase.filter((purchase) => purchase.checked), [extendedPurchase])
//   const checkedPurchaseCount = checkedPurchase.length
//   const totalCheckedPurchasePrice = useMemo(
//     () =>
//       checkedPurchase.reduce((result, current) => {
//         return result + current.product.price * current.buy_count
//       }, 0),
//     [checkedPurchase]
//   )
//   const totalCheckedPurchaseSavingPrice = useMemo(
//     () =>
//       checkedPurchase.reduce((result, current) => {
//         return result + (current.product.price_before_discount - current.product.price) * current.buy_count
//       }, 0),
//     [checkedPurchase]
//   )
//   useEffect(() => {
//     setExtendedPurchase((prev) => {
//       const extendedPurchaseObject = keyBy(prev, '_id')

//       return (
//         purchasesInCart?.map((purchase) => {
//           const isChosenPurchaseIdFromLocation = chosenPurchaseIdFromLocation == purchase._id
//           return {
//             ...purchase,
//             disabled: false,
//             checked: isChosenPurchaseIdFromLocation || Boolean(extendedPurchaseObject[purchase._id]?.checked)
//           }
//         }) || []
//       )
//     })
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [purchasesInCart, chosenPurchaseIdFromLocation])

//   useEffect(() => {
//     return () => {
//       history.replaceState(null, '')
//     }
//   }, [])

//   const handleCheck = (purchaseIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
//     setExtendedPurchase(
//       produce((draft) => {
//         draft[purchaseIndex].checked = e.target.checked
//       })
//     )
//   }

//   const handleCheckAll = () => {
//     setExtendedPurchase((prev) =>
//       prev.map((purchase) => ({
//         ...purchase,
//         checked: !isAllChecked
//       }))
//     )
//   }

//   const hanldeTypeQuantity = (purchaseIndex: number) => (value: number) => {
//     setExtendedPurchase(
//       produce((draft) => {
//         draft[purchaseIndex].buy_count = value
//       })
//     )
//   }

//   const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
//     if (enable) {
//       const purchase = extendedPurchase[purchaseIndex]
//       setExtendedPurchase(
//         produce((draft) => {
//           draft[purchaseIndex].disabled = true
//         })
//       )
//       updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
//     }
//   }

//   const handleDelete = (purchaseIndex: number) => () => {
//     const purchaseId = extendedPurchase[purchaseIndex]._id
//     deletePurchaseMutation.mutate([purchaseId])
//   }

//   const handleDeleteManyPurChase = () => {
//     const purchaseIds = checkedPurchase.map((purchase) => purchase._id)
//     deletePurchaseMutation.mutate(purchaseIds)
//   }

//   // prettier-ignore
//   const handleBuyPurchase = () => {
//     if (checkedPurchase.length > 0) {
//       const body = checkedPurchase.map((purchase) => (
//       {
//         product_id: purchase.product._id,
//         buy_count: purchase.buy_count
//       }))
//       buyProductMutation.mutate(body)
//     }
//   }

//   return (
//     <div className='bg-neutral-100 py-16'>
//       <div className='container'>
//         {extendedPurchase.length > 0 ? (
//           <>
//             <div className='overflow-auto'>
//               <div className='min-w-[1000px]'>
//                 <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
//                   <div className='col-span-6'>
//                     <div className='flex items-center'>
//                       <div className='flex items-center justify-center shrink-0 pr-3'>
//                         <input
//                           type='checkbox'
//                           name=''
//                           className='w-4 h-4 accent-orange'
//                           checked={isAllChecked}
//                           onChange={handleCheckAll}
//                         />
//                       </div>
//                       <div className='flex-grow text-black'>Sản phẩm</div>
//                     </div>
//                   </div>
//                   <div className='col-span-6'>
//                     <div className='grid grid-cols-5 text-center'>
//                       <div className='col-span-2'>Đơn giá</div>
//                       <div className='col-span-1'>Số lượng</div>
//                       <div className='col-span-1'>Số tiền</div>
//                       <div className='col-span-1'>Thao tác</div>
//                     </div>
//                   </div>
//                 </div>
//                 {extendedPurchase.length > 0 && (
//                   <div className='my-3 rounded-sm bg-white p-5 shadow'>
//                     {extendedPurchase?.map((purchase, index) => (
//                       <div
//                         key={purchase._id}
//                         className='grid grid-cols-12 items-center first:mt-0 mt-5 rounded-sm border border-gray-200 bg-white py-5 px-4 text-sm capitalize text-gray-500'
//                       >
//                         <div className='col-span-6'>
//                           <div className='flex'>
//                             <div className='flex items-center justify-center shrink-0 pr-3'>
//                               <input
//                                 type='checkbox'
//                                 name=''
//                                 className='w-4 h-4 accent-orange'
//                                 checked={purchase.checked}
//                                 onChange={handleCheck(index)}
//                               />
//                             </div>
//                             <div className='flex-grow'>
//                               <div className='flex'>
//                                 <Link
//                                   to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
//                                   className='h-16 w-16 flex-shrink-0'
//                                 >
//                                   <img src={purchase.product.image} alt={purchase.product.name} />
//                                 </Link>

//                                 <div className='flex-grow px-2 pt-1 pb-2'>
//                                   <Link
//                                     to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
//                                     className='line-clamp-2 text-left'
//                                   >
//                                     {purchase.product.name}
//                                   </Link>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className='col-span-6'>
//                           <div className='grid grid-cols-5 text-center'>
//                             <div className='col-span-2'>
//                               <div className='flex items-center justify-center'>
//                                 <span className='line-through text-gray-300'>
//                                   ₫{formatCurrency(purchase.product.price_before_discount)}
//                                 </span>
//                                 <span className='mx-3'>₫{formatCurrency(purchase.product.price)}</span>
//                               </div>
//                             </div>
//                             <div className='col-span-1'>
//                               <QuantityController
//                                 max={purchase.product.quantity}
//                                 value={purchase.buy_count}
//                                 classNameWrapper='flex items-center'
//                                 onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
//                                 onDecrease={(value, isReachedLimit) =>
//                                   !isReachedLimit && handleQuantity(index, value, value >= 1)
//                                 }
//                                 onType={hanldeTypeQuantity(index)}
//                                 onFocusOut={(value) =>
//                                   handleQuantity(
//                                     index,
//                                     value,
//                                     value <= purchase.product.quantity &&
//                                       value >= 1 &&
//                                       value !== (purchasesInCart as Purchase[])[index].buy_count
//                                   )
//                                 }
//                                 disabled={purchase.disabled}
//                               />
//                             </div>
//                             <div className='col-span-1'>
//                               <span className='text-orange'>
//                                 ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
//                               </span>
//                             </div>
//                             <div className='col-span-1'>
//                               <button
//                                 onClick={handleDelete(index)}
//                                 className='bg-none text-black transition-colors hover:text-orange'
//                               >
//                                 Xoá
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
//               <div className='flex item-center'>
//                 <div className='flex flex-shrink-0 items-center justify-center pr-3'>
//                   <input
//                     type='checkbox'
//                     className='h-4 w-4 accent-orange'
//                     checked={isAllChecked}
//                     onChange={handleCheckAll}
//                   />
//                 </div>
//                 <button className='mx-3 bg-none border-none' onClick={handleCheckAll}>
//                   Chọn tất cả ({extendedPurchase.length})
//                 </button>
//                 <button onClick={handleDeleteManyPurChase} className='mx-3 bg-none border-none'>
//                   Xoá
//                 </button>
//               </div>
//               <div className='sm:ml-auto mt-5 sm:mt-0 flex items-scenter sm:items-center flex-col sm:flex-row'>
//                 <div>
//                   <div className='flex items-center sm:justify-end'>
//                     <div>Tổng thanh toán ({checkedPurchaseCount} sản phẩm):</div>
//                     <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(totalCheckedPurchasePrice)}</div>
//                   </div>
//                   <div className='flex items-center text-sm sm:justify-end'>
//                     <div className='text-gray-500'>Tiết kiệm</div>
//                     <div className='ml-6 text-orange'>₫{formatCurrency(totalCheckedPurchaseSavingPrice)}</div>
//                   </div>
//                 </div>
//                 <Button
//                   onClick={handleBuyPurchase}
//                   isLoading={buyProductMutation.isPending}
//                   className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
//                 >
//                   Mua hàng
//                 </Button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className='text-center'>
//             <div className='text-center'>
//               <img src={noProduct} alt='no purchase' className='h-24 w-24 mx-auto' />
//             </div>
//             <div className='font-bold text-gray-400 mt-5'>Giỏ hàng của bạn còn trống</div>
//             <div className='mt-5'>
//               <Link
//                 to={path.home}
//                 className='mt-5 px-10 py-2 rounded-sm uppercase text-white bg-orange hover:bg-orange/80 transition-all'
//               >
//                 Mua ngay
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
