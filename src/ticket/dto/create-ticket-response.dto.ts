import { ApiProperty } from '@nestjs/swagger';

export class PayerObject {
  @ApiProperty()
  identification: {
    number: string;
    type: string;
  };

  @ApiProperty()
  entity_type: string;

  @ApiProperty()
  phone: {
    number: string;
    extension: string;
    area_code: string;
  };

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  email: string;
}

export class PaymentMethodObject {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  issuer_id: string;
}

export class TransactionDetailsObject {
  @ApiProperty()
  payment_method_reference_id: string;

  @ApiProperty()
  acquirer_reference: string;

  @ApiProperty()
  net_received_amount: number;

  @ApiProperty()
  total_paid_amount: number;

  @ApiProperty()
  overpaid_amount: number;

  @ApiProperty()
  external_resource_url: string;

  @ApiProperty()
  installment_amount: number;

  @ApiProperty()
  financial_institution: string;

  @ApiProperty()
  payable_deferral_period: string;

  @ApiProperty()
  bank_transfer_id: string;

  @ApiProperty()
  transaction_id: string;
}

export class ChargesDetailsObject {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  accounts: {
    from: string;
    to: string;
  };

  @ApiProperty()
  client_id: number;

  @ApiProperty()
  date_created: string;

  @ApiProperty()
  last_updated: string;

  @ApiProperty()
  amounts: {
    original: number;
    refunded: number;
  };

  @ApiProperty()
  metadata: string;

  @ApiProperty()
  reserve_id: string;

  @ApiProperty({ type: Array })
  refund_charges: [];
}

export class PointOfInteractionObject {
  @ApiProperty()
  type: string;

  @ApiProperty()
  business_info: {
    unit: string;
    sub_unit: string;
    branch: string;
  };

  @ApiProperty()
  location: {
    state_id: string;
    source: string;
  };

  @ApiProperty()
  application_data: {
    name: string;
    version: string;
  };

  @ApiProperty()
  transaction_data: {
    qr_code: string;
    bank_transfer_id: string;
    transaction_id: string;
    e2e_id: string;
    financial_institution: string;
    ticket_url: string;
    bank_info: {
      payer: {
        account_id: string;
        id: string;
        long_name: string;
        account_holder_name: string;
        identification: {
          number: string;
          type: string;
        };
        external_account_id: string;
      };
      collector: {
        account_id: string;
        long_name: string;
        account_holder_name: string;
        transfer_account_id: string;
      };
      is_same_bank_account_owner: string;
      origin_bank_id: string;
      origin_wallet_id: string;
    };
    qr_code_base64: string;
  };
}

export class AdditionalInfoObject {
  @ApiProperty()
  available_balance: string;

  @ApiProperty()
  nsu_processadora: string;

  @ApiProperty()
  authentication_code: string;
}

export class CreateTicketResponseDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  date_created: string;

  @ApiProperty({ type: String })
  date_approved: string;

  @ApiProperty()
  date_last_updated: string;

  @ApiProperty()
  date_of_expiration: string;

  @ApiProperty({ type: String })
  money_release_date: string;

  @ApiProperty()
  money_release_status: string;

  @ApiProperty()
  operation_type: string;

  @ApiProperty()
  issuer_id: string;

  @ApiProperty()
  payment_method_id: string;

  @ApiProperty()
  payment_type_id: string;

  @ApiProperty({ type: () => PaymentMethodObject })
  payment_method: PaymentMethodObject;

  @ApiProperty()
  status: string;

  @ApiProperty()
  status_detail: string;

  @ApiProperty()
  currency_id: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  live_mode: boolean;

  @ApiProperty()
  sponsor_id: string;

  @ApiProperty()
  authorization_code: string;

  @ApiProperty()
  money_release_schema: string;

  @ApiProperty()
  taxes_amount: number;

  @ApiProperty()
  counter_currency: string;

  @ApiProperty()
  brand_id: string;

  @ApiProperty()
  shipping_amount: number;

  @ApiProperty()
  build_version: string;

  @ApiProperty()
  pos_id: string;

  @ApiProperty()
  store_id: string;

  @ApiProperty()
  integrator_id: string;

  @ApiProperty()
  platform_id: string;

  @ApiProperty()
  corporation_id: string;

  @ApiProperty({ type: () => PayerObject })
  payer: PayerObject;

  @ApiProperty()
  collector_id: number;

  @ApiProperty()
  marketplace_owner: string;

  @ApiProperty()
  metadata: object;

  @ApiProperty({ type: AdditionalInfoObject })
  additional_info: AdditionalInfoObject;

  @ApiProperty()
  order: object;

  @ApiProperty()
  external_reference: string;

  @ApiProperty()
  transaction_amount: number;

  @ApiProperty()
  transaction_amount_refunded: number;

  @ApiProperty()
  coupon_amount: number;

  @ApiProperty()
  differential_pricing_id: string;

  @ApiProperty()
  financing_group: string;

  @ApiProperty()
  deduction_schema: string;

  @ApiProperty()
  callback_url: string;

  @ApiProperty()
  installments: number;

  @ApiProperty({ type: TransactionDetailsObject })
  transaction_details: TransactionDetailsObject;

  @ApiProperty({ type: Array })
  fee_details: [];

  @ApiProperty({ type: Array })
  charges_details: ChargesDetailsObject[];

  @ApiProperty()
  captured: boolean;

  @ApiProperty()
  binary_mode: boolean;

  @ApiProperty()
  call_for_authorize_id: string;

  @ApiProperty()
  statement_descriptor: string;

  @ApiProperty()
  card: object;

  @ApiProperty()
  notification_url: string;

  @ApiProperty({ type: Array })
  refunds: [];

  @ApiProperty()
  processing_mode: string;

  @ApiProperty()
  merchant_account_id: string;

  @ApiProperty()
  merchant_number: string;

  @ApiProperty({ type: Array })
  acquirer_reconciliation: [];

  @ApiProperty({ type: PointOfInteractionObject })
  point_of_interaction: PointOfInteractionObject;

  @ApiProperty()
  accounts_info: string;

  @ApiProperty()
  tags: string;
}
