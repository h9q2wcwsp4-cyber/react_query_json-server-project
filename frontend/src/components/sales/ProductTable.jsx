import React, { useMemo, useState } from 'react'
import { useAllGetProduct, useDeleteProduct, usePostRegisterProduct, usePutUpdateProduct } from '../../store/hooks/useProduct'
import { AgGridReact } from 'ag-grid-react'
import ProductModal from './ProductModal'

const ProductTable = () => {
    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState(null);

    const { data: product = [], isLoading, error } = useAllGetProduct() 
    const updateMutation = usePutUpdateProduct();
    const deleteMutation = useDeleteProduct();
    const registerMutation = usePostRegisterProduct();

    const handleRegister = () => {
        setNewProduct(null);
        setOpen(true);
    };

    const handleUpdate = (Item) => {
        setNewProduct(Item);
        setOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("정말 이 상품을 삭제하시겠습니까?")) {
            await deleteMutation.mutateAsync(id)
        }
    };

    // 의존성 배열의 오타를 제거하고 빈 배열([])로 수정하여 불필요한 재렌더링 및 에러를 방지합니다.
    const columnDefs = useMemo(() => [
        { field: "product_name", headerName: "상품명", flex: 1 },
        { field: "color", headerName: "색상", flex: 1 },
        { field: "cost_price", headerName: "원가", flex: 1 },
        { field: "sale_price", headerName: "판매가", flex: 1 },
        { field: "category_code", headerName: "카테고리 코드", flex: 1 },
        { 
            headerName: "상품 관리",
            cellRenderer: (params) => (
              <div style={{ display: 'flex', gap: '5px', paddingTop: '4px' }}>
                <button onClick={() => handleUpdate(params.data)}>수정</button>
                <button onClick={() => handleDelete(params.data.id)}>삭제</button>
              </div>
            ),
            flex: 1 
        },
    ], []); // 👈 빈 배열로 변경
    
    if (isLoading) return <h3>Loading..</h3>
    if (error) return <h3>{error?.message}</h3>

    return (
        <>
        <div>
          <div>상품관리</div>
          <button onClick={handleRegister}>상품등록</button>
        </div>
        
        <div className='ag-theme-alpine' style={{ height: 700, width: '100%', marginTop: '10px' }}>
          <AgGridReact
            theme="legacy"
            rowData={product} 
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={25}
            paginationPageSizeSelector={false}
            animateRows={true}
            getRowId={(params) => params.data.id?.toString()}
          />
        </div>

        <ProductModal
          open={open}
          setOpen={setOpen}
          initialValues={newProduct}
          onSubmit={async (productObj) => {
            console.log("productObj", productObj)
            if (newProduct) {
              await updateMutation.mutateAsync({ ...productObj, id: newProduct.id })
            } else {
              await registerMutation.mutateAsync(productObj)
            }
            setOpen(false)
          }}
        />
        </>
    )
}

export default ProductTable