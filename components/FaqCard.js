import React from 'react';

export default function FaqCard(props) {
  return (
    <div className='faq-container'>
      <h2>{props.faqLabel}</h2>
      <p>{props.faqContent}</p>
    </div>
  );
}
