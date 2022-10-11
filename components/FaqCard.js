import React from 'react';

export default function FaqCard(props) {
  const { faqLabel, faqContent } = props;
  return (
    <div className='faq-container'>
      <h2>{faqLabel}</h2>
      <p>{faqContent}</p>
    </div>
  );
}
