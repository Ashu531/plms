import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';

const { TextArea } = Input;

const CommentBoxModal = ({ visible, onClose, onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <Modal
      title="Add Comment"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <TextArea
        rows={4}
        value={comment}
        onChange={handleCommentChange}
        placeholder="Enter your comment"
      />
    </Modal>
  );
};

export default CommentBoxModal;
