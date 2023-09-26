
export interface IPriceHistory {
    price_buy: string,
    price_sell: string,
    updated_at: string,
}

export interface ICurrency {
    name: string,
    code: string,
    count: number,
    price_sell: string
    price_buy: string,
    updated_at: string,
    history: IPriceHistory[]
}

export interface ICoin {
    name: string,
    price_sell: string
    price_buy: string,
    updated_at: string,
    history: IPriceHistory[]
}

export interface cryptoCurrencies {
    name: string,
    code: string,
    price: string,
    history: IPriceHistory[]
}

export interface topCardCurrencies {
    name: string,
    price: string,
    icon: string,
    history: IPriceHistory[]
}
