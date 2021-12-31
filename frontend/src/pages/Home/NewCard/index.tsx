import React, { useState } from 'react';

import { InputGroup, InputNumber } from '@components';
import { useApi } from '@contexts';
import { parse } from 'date-fns';

// import { Container } from './styles';

type Props = {
  onSave: () => Promise<void>;
};

export const NewCard: React.FC<Props> = ({ onSave }) => {
  const api = useApi();

  const [Card, setCard] = useState<any>({});

  async function handleSave() {
    try {
      const parsedCard = {
        dueDate: parse(Card.dueDate, 'dd/MM/yyyy', Date.now()),
        number: Card.number.replace(new RegExp(' ', 'g'), ''),
        closingDay: Number(Card.closingDay)
      };

      await api.request<any>('POST', '/cards', parsedCard);
      setCard({});

      await onSave();
    } catch (e) {
      alert(e);
    }
  }

  return (
    <>
      <InputGroup title="Número do Cartão">
        <InputNumber
          name="card-number"
          format="#### #### #### ####"
          value={Card.number}
          onChange={(e) => setCard({ ...Card, number: e.target.value })}
        />
      </InputGroup>

      <InputGroup title="Data de Validade">
        <InputNumber
          name="card-expiration"
          maskType="date"
          value={Card.dueDate}
          onChange={(e) => {
            setCard({ ...Card, dueDate: e.target.value });
          }}
        />
      </InputGroup>

      <InputGroup title="Dia de Vencimento">
        <InputNumber format="##" value={Card.closingDay} onChange={(e) => setCard({ ...Card, closingDay: e.target.value })} />
      </InputGroup>

      <button onClick={handleSave}>Salvar</button>
    </>
  );
};
