import * as React from 'react';
import { Container, Header, MessageList, Composer, useWebchat, Fab } from '@botpress/webchat'
import { useState, useMemo } from 'react'
import logo from '../assets/bot-logo.png'
import bot from '../assets/bot.png'
import { useSound } from 'react-sounds';

const headerConfig = {
  botName: 'Relife Assistant',
  // botAvatar: logo,
  // botDescription: 'Your virtual assistant for all things support.',

  phone: {
    title: 'Call Support',
    link: 'tel:+1234567890',
  },

  email: {
    title: 'Email Us',
    link: 'mailto:support@example.com',
  },

  website: {
    title: 'Visit our website',
    link: 'https://www.example.com',
  },

  termsOfService: {
    title: 'Terms of Service',
    link: 'https://www.example.com/terms',
  },

  privacyPolicy: {
    title: 'Privacy Policy',
    link: 'https://www.example.com/privacy',
  },

}

const ChatWidget = () => {
  const [isWebchatOpen, setIsWebchatOpen] = useState(false)

  const open = useSound('ui/pop_open');
  const close = useSound('ui/pop_close');


  const { client, clientState, on, user, conversationId, newConversation, messages, isFetchingMessages, isTyping } =
    useWebchat({
      clientId: import.meta.env.VITE_BOTPRESS
    })

  const config = {
    botName: 'Relife Assistant',
    botAvatar: logo,
    botDescription: 'Your virtual assistant for all things support.',
  }
  const enrichedMessages = useMemo(
    () =>
      messages.map((message) => {
        const { authorId } = message
        const direction = authorId === user?.userId ? 'outgoing' : 'incoming'
        return {
          ...message,
          direction,
          sender:
            direction === 'outgoing'
              ? { name: user?.name ?? 'You', avatar: user?.pictureUrl }
              : { name: config.botName ?? 'Bot', avatar: config.botAvatar },
        }
      }),
    [
      config.botAvatar,
      config.botName,
      messages,
      user?.userId,
      user?.name,
      user?.pictureUrl
    ]
  )

  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState)
    !isWebchatOpen ? open.play() : close.play();
  }

  return (
    <>
      <Container
        connected={clientState !== 'disconnected'}
        style={{
          width: '350px',
          height: '400px',
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          borderRadius: '12px',
          display: isWebchatOpen ? 'flex' : 'none',
          overflow: 'hidden',
        }}
      >
        <Header
          defaultOpen={false}
          closeWindow={() => setIsWebchatOpen(false)}
          restartConversation={newConversation}
          disabled={false}
          configuration={headerConfig}
          style={{
            backgroundColor: "lightGreen",
          }}
        />
        <MessageList
          botAvatar={config.botAvatar}
          botName={config.botName}
          botDescription={config.botDescription}
          isTyping={isTyping}
          headerMessage="Chat History"
          showMarquee={true}
          messages={enrichedMessages}
          sendMessage={client?.sendMessage}
        />
        <Composer
          disableComposer={false}
          isReadOnly={false}
          allowFileUpload={true}
          connected={clientState !== 'disconnected'}
          sendMessage={client?.sendMessage}
          uploadFile={client?.uploadFile}
          composerPlaceholder="Type a message..."
        />
      </Container>
      <div className="fixed bottom-5 right-5 z-50">
        <div className="flex justify-center">
          <span className="relative flex h-14 w-14">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400"
            ></span>
            <span className="relative inline-flex h-14 w-14 rounded-full">
              <Fab
                onClick={toggleWebchat}
                imgUrl={bot}
                style={{
                  width: '56px',
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
              />
            </span>
          </span>
        </div>
      </div>
    </>
  )
}

export default ChatWidget
