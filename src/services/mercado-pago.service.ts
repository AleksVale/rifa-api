import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig, Payment } from 'mercadopago';

@Injectable()
export class MercadoPagoService {
  private mercadoPagoConfig: MercadoPagoConfig;
  private payment: Payment;
  constructor(private readonly configService: ConfigService) {
    this.mercadoPagoConfig = new MercadoPagoConfig({
      accessToken: this.configService.get<string>('MERCADO_PAGO_ACCESS_TOKEN'),
      options: { timeout: 5000, idempotencyKey: 'abc' },
    });
    this.payment = new Payment(this.mercadoPagoConfig);
  }

  async createPayment(data: MercadoPagoPaymentDto): Promise<any> {
    try {
      console.log(
        `${this.configService.get<string>(
          'DOMAIN',
        )}/transaction?source_news=webhook`,
      );
      const responseMercado = await this.payment.create({
        body: {
          transaction_amount: data.transaction_amount,
          description: data.description,
          payment_method_id: 'pix',
          payer: {
            email: data.email,
            identification: {
              type: data.identificationType,
              number: data.number,
            },
          },
          notification_url: `${this.configService.get<string>(
            'DOMAIN',
          )}/transaction`,
        },
      });
      return responseMercado;
    } catch (error) {
      throw new Error(`Failed to create payment: ${error.message}`);
    }
  }

  async getPayment(id: number) {
    try {
      const responseMercado = await this.payment.get({
        id: id.toString(),
      });
      return responseMercado;
    } catch (error) {
      throw new Error(`Failed to get payment: ${error.message}`);
    }
  }
}

// DTO para os dados do pagamento
export class MercadoPagoPaymentDto {
  transaction_amount: number;
  description: string;
  paymentMethodId: string;
  email: string;
  identificationType: string;
  number: string;
}

export interface MercadoPagoPayment {
  id: number;
  date_created: string;
  date_approved: string | null;
  date_last_updated: string;
  date_of_expiration: string;
  money_release_date: string | null;
  money_release_status: string;
  operation_type: string;
  issuer_id: string;
  payment_method_id: string;
  payment_type_id: string;
  payment_method: {
    id: string;
    type: string;
    issuer_id: string;
  };
  status: string;
  status_detail: string;
  currency_id: string;
  description: string;
  live_mode: boolean;
  sponsor_id: null;
  authorization_code: null;
  money_release_schema: null;
  taxes_amount: number;
  counter_currency: null;
  brand_id: null;
  shipping_amount: number;
  build_version: string;
  pos_id: null;
  store_id: null;
  integrator_id: null;
  platform_id: null;
  corporation_id: null;
  payer: {
    identification: {
      number: string;
      type: string;
    };
    entity_type: null;
    phone: {
      number: null;
      extension: null;
      area_code: null;
    };
    last_name: null;
    id: string;
    type: null;
    first_name: null;
    email: string;
  };
  collector_id: number;
  marketplace_owner: null;
  metadata: object;
  additional_info: {
    available_balance: null;
    nsu_processadora: null;
    authentication_code: null;
  };
  order: object;
  external_reference: null;
  transaction_amount: number;
  transaction_amount_refunded: number;
  coupon_amount: number;
  differential_pricing_id: null;
  financing_group: null;
  deduction_schema: null;
  callback_url: null;
  installments: number;
  transaction_details: {
    payment_method_reference_id: null;
    acquirer_reference: null;
    net_received_amount: number;
    total_paid_amount: number;
    overpaid_amount: number;
    external_resource_url: null;
    installment_amount: number;
    financial_institution: null;
    payable_deferral_period: null;
    bank_transfer_id: null;
    transaction_id: null;
  };
  fee_details: [];
  charges_details: [
    {
      id: string;
      name: string;
      type: string;
      accounts: {
        from: string;
        to: string;
      };
      client_id: number;
      date_created: string;
      last_updated: string;
      amounts: {
        original: number;
        refunded: number;
      };
      metadata: object;
      reserve_id: null;
      refund_charges: [];
    },
  ];
  captured: boolean;
  binary_mode: boolean;
  call_for_authorize_id: null;
  statement_descriptor: null;
  card: object;
  notification_url: null;
  refunds: [];
  processing_mode: string;
  merchant_account_id: null;
  merchant_number: null;
  acquirer_reconciliation: [];
  point_of_interaction: {
    type: string;
    business_info: {
      unit: string;
      sub_unit: string;
      branch: null;
    };
    location: {
      state_id: null;
      source: null;
    };
    application_data: {
      name: null;
      version: null;
    };
    transaction_data: {
      qr_code: string;
      bank_transfer_id: null;
      transaction_id: null;
      e2e_id: null;
      financial_institution: null;
      ticket_url: string;
      bank_info: {
        payer: {
          account_id: null;
          id: null;
          long_name: null;
          account_holder_name: null;
          identification: {
            number: null;
            type: null;
          };
          external_account_id: null;
        };
        collector: {
          account_id: null;
          long_name: null;
          account_holder_name: string;
          transfer_account_id: null;
        };
        is_same_bank_account_owner: null;
        origin_bank_id: null;
        origin_wallet_id: null;
      };
      qr_code_base64: string;
    };
  };
  accounts_info: null;
  tags: null;
}
