import React, { useEffect, useState } from 'react';
import { useApi } from '@contexts';
import { NewCard } from './NewCard';
import { CardDetail, CardsList, CardsListItem, Container } from './styles';
import { format, parseISO } from 'date-fns';
import { NewCardPurchase } from './NewCardPurchase';
import { Alert, InputGroup, InputNumber } from '@components';
import { Login } from './Login';

// import { Container } from './styles';

export const Home: React.FC = () => {
  const api = useApi();

  const [LoggedIn, setLoggedIn] = useState(false);
  const [Cards, setCards] = useState([]);
  const [Card, setCard] = useState<any>(null);
  const [Predictions, setPredictions] = useState([]);

  const [CardsError, setCardsError] = useState(null);

  useEffect(() => {
    (async () => {
      await loadCards();
    })();
  }, []);

  async function loadCards() {
    try {
      const cards = await api.request<any>('GET', '/cards');
      setCards(cards);
    } catch (e) {
      setCardsError(e);
    }
  }

  async function handleSaveNewCard() {
    await loadCards();
  }

  async function handleDeleteCard(cardId: string) {
    await api.request('DELETE', `/cards/${cardId}`);
    await loadCards();
  }

  async function handleSelectCard(cardId: string) {
    const card = await api.request('GET', `/cards/${cardId}`);
    const prediction = await api.request<[]>('GET', `/prediction`);
    setCard(card);
    setPredictions(prediction);
  }

  async function handleSaveNewCardPurchase(cardPurchase) {
    const card = {
      ...Card,
      purchases: [...Card.purchases, cardPurchase]
    };
    await api.request('PATCH', `/cards/${Card._id}`, card);

    await handleSelectCard(Card._id);
  }

  async function handleDeletePurchase(cardPurchase) {
    const purchases = Card.purchases.filter((x) => x !== cardPurchase);

    const card = {
      ...Card,
      purchases: purchases
    };

    await api.request('PATCH', `/cards/${Card._id}`, card);

    await handleSelectCard(Card._id);
  }

  function handleLogin(success, error) {
    setLoggedIn(success);

    if (error) alert(error);
  }

  return (
    <>
      <Login onLogin={handleLogin} />

      {LoggedIn && (
        <>
          <NewCard onSave={handleSaveNewCard} />

          <Container>
            <CardsList>
              {CardsError && <Alert>{CardsError}</Alert>}

              {Cards.map((card: any, index: number) => (
                <CardsListItem key={index}>
                  {card.number}
                  <button onClick={() => handleDeleteCard(card._id)}>Excluir</button>
                  <button onClick={() => handleSelectCard(card._id)}>Selecionar</button>
                </CardsListItem>
              ))}
            </CardsList>

            <CardDetail>
              {Card && (
                <>
                  <div>
                    <strong>N??mero:</strong> {Card.number}
                  </div>
                  <div>
                    <strong>Data de Validade:</strong> {format(parseISO(Card.dueDate), 'MM/yyyy')}
                  </div>

                  <hr />
                  <hr />

                  <h1>Itens:</h1>

                  <NewCardPurchase onSave={handleSaveNewCardPurchase} />

                  <div>
                    {Card.purchases?.map((purchase: any, index: number) => (
                      <div key={index}>
                        <hr />

                        <strong>{purchase.description}</strong>

                        <InputGroup title="Data">
                          <InputNumber displayType="text" maskType="date" value={format(parseISO(purchase.date), 'dd/MM/yyyy')} />
                        </InputGroup>

                        <InputGroup title="Valor">
                          <InputNumber displayType="text" maskType="money" prefix="R$ " value={purchase.value} />
                        </InputGroup>

                        {purchase.installmentValue && (
                          <>
                            <InputGroup title="Parcelas">
                              {purchase.paidInstallments}/{purchase.numberOfInstallments}
                            </InputGroup>

                            <InputGroup title="Valor Parcelas">
                              <InputNumber displayType="text" maskType="money" prefix="R$ " value={purchase.installmentValue} />
                            </InputGroup>
                          </>
                        )}

                        <button onClick={() => handleDeletePurchase(purchase)}>Excluir</button>
                      </div>
                    ))}
                  </div>

                  <hr />
                  <hr />

                  <h1>Previs??es:</h1>

                  {Predictions.map((prediction: any, index: number) => (
                    <div key={index}>
                      <InputGroup title="M??s">
                        <h4>{format(parseISO(prediction.date), 'MM/yyyy')}</h4>
                      </InputGroup>

                      {prediction.purchases.map((purchase: any, index2: number) => (
                        <div key={index2}>
                          <h3>{purchase.description}</h3>

                          {!purchase.installmentValue && (
                            <>
                              <InputGroup title="Valor">
                                <InputNumber displayType="text" maskType="money" prefix="R$ " value={purchase.value} />
                              </InputGroup>
                            </>
                          )}
                          {purchase.installmentValue && (
                            <>
                              <InputGroup title="Parcelas">
                                {purchase.paidInstallments}/{purchase.numberOfInstallments}
                              </InputGroup>

                              <InputGroup title="Valor Parcelas">
                                <InputNumber displayType="text" maskType="money" prefix="R$ " value={purchase.installmentValue} />
                              </InputGroup>
                            </>
                          )}
                        </div>
                      ))}

                      <InputGroup title="Total">
                        <h4>
                          <InputNumber
                            displayType="text"
                            maskType="money"
                            prefix="R$ "
                            value={prediction.purchases.reduce(
                              (sum: number, current: any) => sum + current.installmentValue ?? current.value,
                              0
                            )}
                          />
                        </h4>
                      </InputGroup>
                      <hr />
                    </div>
                  ))}
                </>
              )}
            </CardDetail>
          </Container>
        </>
      )}
    </>
  );
};
