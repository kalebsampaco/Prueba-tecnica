import { describe, expect, it, jest } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-express';
import { transferAmount } from '../controllers/giftCard.controllers';
import GiftCards from '../models/giftCard';

jest.mock('../models/giftCard');

describe('Transfer Endpoint', () => {
  const usr_id = 1;
  type GiftCardMock = jest.Mock<any>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Debe retornar error si el amount es cero o negativo', async () => {
    const req = mockRequest({
      body: { sourceCardId: '5', destinationCardId: '6', amount: 0 },
    });
    const res = mockResponse();

    await transferAmount(req, res, usr_id);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: 'error',
      message: 'El amount es cero, nulo o negativo',
    });
  });

  it('Debe retornar error si no se encuentra la gift card origen', async () => {

    const req = mockRequest({
      body: { sourceCardId: '5', destinationCardId: '6', amount: 60 },
    });
    const res = mockResponse();

    const findOneMock: GiftCardMock = GiftCards.findOne as GiftCardMock;
    findOneMock.mockResolvedValueOnce(null)
    findOneMock.mockResolvedValueOnce({ amount: 100 });

    await transferAmount(req, res, usr_id);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      status: 'error',
      message: 'No se encontró la gift card origen con id 5 asociada al usuario.',
    });
  });

  it('Debe retornar error si la gift card origen no tiene saldo suficiente', async () => {
    const req = mockRequest({
      body: { sourceCardId: '5', destinationCardId: '6', amount: 200 },
    });
    const res = mockResponse();

    const findOneMock: GiftCardMock = GiftCards.findOne as GiftCardMock;
    findOneMock.mockResolvedValueOnce({ amount: 100, save: jest.fn() }) // sourceCard
    findOneMock.mockResolvedValueOnce({ amount: 100, save: jest.fn() }); // destinationCard

    await transferAmount(req, res, usr_id);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: 'error',
      message: 'La gift card origen no tiene saldo suficiente',
    });
  });

  it('Debe realizar la transferencia correctamente', async () => {
    const saveSourceMock = jest.fn();
    const saveDestinationMock = jest.fn();

    const req = mockRequest({
      body: { sourceCardId: '5', destinationCardId: '6', amount: 50 },
    });
    const res = mockResponse();

    const findOneMock: GiftCardMock = GiftCards.findOne as GiftCardMock;
    findOneMock.mockResolvedValueOnce({ amount: 100, save: saveSourceMock }) // sourceCard
    findOneMock.mockResolvedValueOnce({ amount: 50, save: saveDestinationMock }); // destinationCard

    await transferAmount(req, res, usr_id);

    expect(saveSourceMock).toHaveBeenCalled();
    expect(saveDestinationMock).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: 'success',
      sourceUpdate: { amount: 50, save: saveSourceMock },
      destinationUpdate: { amount: 100, save: saveDestinationMock },
    });
  });
});
