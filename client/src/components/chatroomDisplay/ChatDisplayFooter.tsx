import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveMessage, AIresponse } from '../../ApiService';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import VoiceRecording from './VoiceRecording';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import socket from '../../Socket';
import { TextField } from '@mui/material';

export default function ChatDisplayFooter({ chat }: { chat: string }) {
  const chatroom = useSelector((state: RootState) => state.ChatReducer);
  const user = useSelector((state: RootState) => state.UserReducer);
  const dispatch = useDispatch();

  // state to handle the text input field
  const [Text, SetText] = useState('');
  const changeTxt = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    SetText(event.target.value);
  };

  const handleSubmit = async function (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    if (Text.length > 0) {
      // create a unique message id
      const messageId = uuidv4();
      const newTimeStamp = Date.now();
      // create the data to be send to the database
      const data = {
        AI_id: chatroom.chatroomId,
        AI_image: chatroom.AI_image,
        AI_name: chatroom.AI_name,
        userIds: chatroom.userIds,
        nativeLanguage: chatroom.nativeLanguage,
        chatroomId: chatroom.chatroomId,
        users: chatroom.users,
        targetLanguage: chatroom.targetLanguage,
        messages: {
          messageId: messageId,
          senderId: user._id,
          senderName: user.name,
          timeStamp: newTimeStamp,
          text: Text,
          audio: '',
          translatedText: '',
        },
      };
      console.log(data);
      // reset the inout field
      SetText('');
      //save the message to the database
      const chatroomDetail = await saveMessage(data);
      console.log(chatroomDetail)
      // update the message on the front end
      dispatch({ type: 'updatemessages', payload: chatroomDetail });
      if (chat === 'ai') {
        dispatch({ type: 'istyping', payload: true });
        const response = await AIresponse(chatroomDetail);
        dispatch({ type: 'updatemessages', payload: response });
        dispatch({ type: 'istyping', payload: false });
      } else {
        const recipient = chatroom.userIds?.filter((u) => u !== user?._id)[0];
        socket.emit('message', { to: recipient });
      }
    }
  };

  return (
    <form
      className='message_footer_wrapper'
      data-testid='message_footer_wrapper'
      onSubmit={handleSubmit}
    >
      <VoiceRecording />
      <TextField
        type='text'
        variant='outlined'
        sx={{
          width: '100%',
          padding: '0.5rem',
          borderRadius: '0.5rem',
          fieldset: { borderColor: '#035e7b' },
        }}
        InputProps={{
          style: {
            color: '#CCD6F6',
            borderColor: '#035e7b',
          },
        }}
        onChange={changeTxt}
        size='small'
        name='message'
        value={Text}
        required={true}
        placeholder='Type a message...'
        autoComplete='off'
      />
      <button
        type='submit'
        data-testid='send'
        className='send'
        style={{ border: 'none', background: 'none' }}
      >
        <FontAwesomeIcon
          style={{ color: '#CCD6F6' }}
          icon={faPaperPlane as IconDefinition}
        />
      </button>
    </form>
  );
}
