import { useState } from 'react';
import styled from 'styled-components';
import { MenuItem } from '../../mocks/menuData';
import api from '../../api';

interface ChatBotProps {
  onAddToCart: (item: MenuItem) => void;
}

const ChatBot = ({ onAddToCart }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean; recommendedItems?: MenuItem[] }>
  >([
    {
      text: '안녕하세요! 주문을 도와드릴 수 있습니다. 어떤 메뉴를 찾으시나요?',
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    setIsLoading(true);

    const userInput = input;
    setInput('');

    try {
      const response = await api.getAiCompletions(userInput);

      setMessages((prev) => [
        ...prev,
        {
          text: response.description,
          isUser: false,
          recommendedItems: response.recommendedItems,
        },
      ]);
    } catch (error) {
      console.log(error);
      setMessages((prev) => [
        ...prev,
        {
          text: '죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.',
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ChatButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '닫기' : 'AI 메뉴 추천'}
      </ChatButton>

      {isOpen && (
        <ChatContainer>
          <ChatHeader>
            <h3>주문 도우미</h3>
          </ChatHeader>

          <MessagesContainer>
            <ChatMessages>
              {messages.map((message, index) => (
                <MessageGroup key={index}>
                  <Message isUser={message.isUser}>{message.text}</Message>
                  {message.recommendedItems && (
                    <RecommendedItems>
                      {message.recommendedItems.map((item) => (
                        <RecommendedItem key={item.id}>
                          <ItemImage src={item.image} alt={item.name} />
                          <ItemInfo>
                            <ItemName>{item.name}</ItemName>
                            <ItemDescription>
                              {item.description}
                            </ItemDescription>
                            <ItemPrice>
                              {item.price.toLocaleString()}원
                            </ItemPrice>
                          </ItemInfo>
                          <AddButton onClick={() => onAddToCart(item)}>
                            담기
                          </AddButton>
                        </RecommendedItem>
                      ))}
                    </RecommendedItems>
                  )}
                </MessageGroup>
              ))}
              {isLoading && (
                <LoadingMessage>
                  <LoadingDot delay="0s">.</LoadingDot>
                  <LoadingDot delay="0.2s">.</LoadingDot>
                  <LoadingDot delay="0.4s">.</LoadingDot>
                </LoadingMessage>
              )}
            </ChatMessages>
          </MessagesContainer>

          <Form onSubmit={handleSubmit}>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="메시지를 입력하세요..."
            />
            <SendButton type="submit">전송</SendButton>
          </Form>
        </ChatContainer>
      )}
    </>
  );
};

const ChatButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 20px;
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

const ChatContainer = styled.div`
  position: fixed;
  bottom: 80px;
  left: 20px;
  width: 350px;
  height: 500px;
  background: #2d2d2d;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  padding: 16px;
  background: #1e88e5;
  color: white;
  border-radius: 12px 12px 0 0;

  h3 {
    margin: 0;
    font-size: 18px;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Message = styled.div<{ isUser: boolean }>`
  max-width: 80%;
  padding: 12px;
  border-radius: 12px;
  background: ${(props) => (props.isUser ? '#424242' : '#363636')};
  color: #e0e0e0;
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
`;

const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const RecommendedItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-self: flex-start;
`;

const RecommendedItem = styled.div`
  display: flex;
  align-items: center;
  background: #3d3d3d;
  border-radius: 8px;
  padding: 8px;
  gap: 12px;
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  object-fit: cover;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h4`
  margin: 0;
  color: #ffffff;
  font-size: 14px;
`;

const ItemDescription = styled.p`
  margin: 4px 0;
  color: #b0b0b0;
  font-size: 12px;
`;

const ItemPrice = styled.p`
  margin: 0;
  color: #1e88e5;
  font-size: 14px;
  font-weight: 600;
`;

const AddButton = styled.button`
  padding: 6px 12px;
  background-color: #1e88e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1976d2;
  }
`;

const Form = styled.form`
  display: flex;
  padding: 16px;
  gap: 8px;
  background: #2d2d2d;
  border-top: 1px solid #444;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #444;
  border-radius: 25px;
  font-size: 14px;
  outline: none;
  background: #3d3d3d;
  color: white;

  &:focus {
    border-color: #1e88e5;
  }

  &::placeholder {
    color: #888;
  }
`;

const SendButton = styled.button`
  padding: 12px 24px;
  background: #424242;
  color: #e0e0e0;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: #4a4a4a;
  }
`;

const LoadingMessage = styled.div`
  max-width: 80%;
  padding: 12px;
  margin: 4px 0;
  background: #3d3d3d;
  border-radius: 12px;
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 2px;
  color: #e0e0e0;
`;

const LoadingDot = styled.span<{ delay: string }>`
  font-size: 24px;
  animation: bounce 1s infinite;
  animation-delay: ${(props) => props.delay};
  color: inherit;

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
`;

export default ChatBot;
