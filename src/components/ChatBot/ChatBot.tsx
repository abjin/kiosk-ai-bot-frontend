import { useState } from 'react';
import styled from 'styled-components';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([
    {
      text: '안녕하세요! 주문을 도와드릴 수 있습니다. 어떤 메뉴를 찾으시나요?',
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    // 실제 챗봇 응답은 API 연동 후 구현
    setMessages((prev) => [
      ...prev,
      {
        text: '현재는 데모 버전입니다. API 연동 후 실제 응답이 제공될 예정입니다.',
        isUser: false,
      },
    ]);
    setInput('');
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
            {messages.map((message, index) => (
              <Message key={index} isUser={message.isUser}>
                {message.text}
              </Message>
            ))}
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

const Message = styled.div<{ isUser: boolean }>`
  max-width: 80%;
  padding: 12px;
  border-radius: 12px;
  background: ${(props) => (props.isUser ? '#424242' : '#363636')};
  color: #e0e0e0;
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
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

export default ChatBot;
