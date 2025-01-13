import { useState } from 'react';
import styled from 'styled-components';
import { MenuItem } from '../../mocks/menuData';

interface CartItem extends MenuItem {
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: number, change: number) => void;
  onRemoveItem: (itemId: number) => void;
}

const Cart = ({ items, onUpdateQuantity, onRemoveItem }: CartProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <CartButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '닫기' : `장바구니 (${totalItems})`}
      </CartButton>

      {isOpen && (
        <CartContainer>
          <CartHeader>
            <h3>장바구니</h3>
          </CartHeader>

          <ItemsContainer>
            {items.length === 0 ? (
              <EmptyCart>장바구니가 비어있습니다</EmptyCart>
            ) : (
              items.map((item) => (
                <CartItemCard key={item.id}>
                  <ItemInfo>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>
                      {(item.price * item.quantity).toLocaleString()}원
                    </ItemPrice>
                  </ItemInfo>
                  <ItemControls>
                    <QuantityButton
                      onClick={() => onUpdateQuantity(item.id, -1)}
                    >
                      -
                    </QuantityButton>
                    <QuantityDisplay>{item.quantity}</QuantityDisplay>
                    <QuantityButton
                      onClick={() => onUpdateQuantity(item.id, 1)}
                    >
                      +
                    </QuantityButton>
                    <RemoveButton onClick={() => onRemoveItem(item.id)}>
                      삭제
                    </RemoveButton>
                  </ItemControls>
                </CartItemCard>
              ))
            )}
          </ItemsContainer>

          {items.length > 0 && (
            <CartFooter>
              <TotalAmount>
                총 주문금액: {totalAmount.toLocaleString()}원
              </TotalAmount>
              <OrderButton>주문하기</OrderButton>
            </CartFooter>
          )}
        </CartContainer>
      )}
    </>
  );
};

const CartButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 24px;
  background-color: #424242;
  color: #e0e0e0;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background-color: #4a4a4a;
    transform: translateY(-2px);
  }
`;

const CartContainer = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 350px;
  height: 500px;
  background: #2d2d2d;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

const CartHeader = styled.div`
  padding: 16px;
  background: #1e88e5;
  color: white;
  border-radius: 12px 12px 0 0;

  h3 {
    margin: 0;
    font-size: 18px;
  }
`;

const ItemsContainer = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EmptyCart = styled.div`
  text-align: center;
  color: #b0b0b0;
  padding: 20px;
`;

const CartItemCard = styled.div`
  padding: 12px;
  background: #3d3d3d;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemName = styled.span`
  font-weight: 500;
  color: white;
`;

const ItemPrice = styled.span`
  color: #1e88e5;
  font-weight: 600;
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 4px;
  background: #424242;
  color: #e0e0e0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: #4a4a4a;
  }
`;

const QuantityDisplay = styled.span`
  min-width: 30px;
  text-align: center;
  font-weight: 500;
  color: white;
`;

const RemoveButton = styled.button`
  margin-left: auto;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: #505050;
  color: #e0e0e0;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: #5a5a5a;
  }
`;

const CartFooter = styled.div`
  padding: 16px;
  border-top: 1px solid #444;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #2d2d2d;
`;

const TotalAmount = styled.div`
  font-size: 18px;
  font-weight: 600;
  text-align: right;
  color: #1e88e5;
`;

const OrderButton = styled.button`
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #424242;
  color: #e0e0e0;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #4a4a4a;
    transform: translateY(-1px);
  }
`;

export default Cart;
