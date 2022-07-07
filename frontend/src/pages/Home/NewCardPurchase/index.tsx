import { Input, InputGroup, InputNumber } from '@components';
import { format, parse } from 'date-fns';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

type Props = {
  // eslint-disable-next-line no-unused-vars
  onSave: (cardPurchase: any) => Promise<void>;
};

export const NewCardPurchase: React.FC<Props> = ({ onSave }) => {
  const [CardPurchase, setCardPurchase] = useState<any>({});

  useEffect(() => {
    setCardPurchase({
      description: '',
      date: format(new Date(), 'dd/MM/yyyy')
    });
  }, []);

  function handleCalculateInstallmentValue() {
    if (CardPurchase.value && CardPurchase.numberOfInstallments) {
      const installmentValue = CardPurchase.value / CardPurchase.numberOfInstallments;
      setCardPurchase({
        ...CardPurchase,
        installmentValue
      });
    }
  }

  function handleCalculateTotalPurchaseValue() {
    if (CardPurchase.installmentValue && CardPurchase.numberOfInstallments) {
      const value = CardPurchase.installmentValue * CardPurchase.numberOfInstallments;
      setCardPurchase({
        ...CardPurchase,
        value
      });
    }
  }

  async function handleSave() {
    const purchase = {
      ...CardPurchase,
      date: parse(CardPurchase.date, 'dd/MM/yyyy', Date.now()),
      numberOfInstallments: CardPurchase.numberOfInstallments,
      paidInstallments: CardPurchase.paidInstallments,
      value: CardPurchase.value,
      installmentValue: CardPurchase.installmentValue
    };
    await onSave(purchase);
    setCardPurchase({});
  }

  return (
    <>
      <InputGroup title="Descrição">
        <Input
          name="card-purchase-description"
          value={CardPurchase.description}
          onChange={(e) => setCardPurchase({ ...CardPurchase, description: e.target.value })}
        />
      </InputGroup>

      <InputGroup title="Data">
        <InputNumber
          maskType="date"
          name="card-purchase-date"
          value={CardPurchase.date}
          onValueChange={(e) => setCardPurchase({ ...CardPurchase, date: e.formattedValue })}
        />
      </InputGroup>

      <InputGroup title="Valor">
        <InputNumber
          maskType="money"
          name="card-purchase-date"
          value={CardPurchase.value}
          onValueChange={(e) => setCardPurchase({ ...CardPurchase, value: e.floatValue })}
        />
      </InputGroup>

      <InputGroup title="Parcelas">
        <InputNumber
          format="###"
          name="card-purchase-installments"
          value={CardPurchase.numberOfInstallments}
          onBlur={handleCalculateInstallmentValue}
          onValueChange={(e) => setCardPurchase({ ...CardPurchase, numberOfInstallments: e.floatValue })}
        />
      </InputGroup>

      <InputGroup title="Parcelas Pagas">
        <InputNumber
          format="###"
          name="card-purchase-paid-installments"
          value={CardPurchase.paidInstallments}
          onValueChange={(e) => setCardPurchase({ ...CardPurchase, paidInstallments: e.floatValue })}
        />
      </InputGroup>

      <InputGroup title="Valor das Parcelas">
        <InputNumber
          maskType="money"
          name="card-purchase-installments-value"
          value={CardPurchase.installmentValue}
          onBlur={handleCalculateTotalPurchaseValue}
          onValueChange={(e) => setCardPurchase({ ...CardPurchase, installmentValue: e.floatValue })}
        />
      </InputGroup>

      <button onClick={handleSave}>Salvar</button>
    </>
  );
};
