import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
};

export type AddonInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type AddonProduct = {
  __typename?: 'AddonProduct';
  id?: Maybe<Scalars['Int']['output']>;
  isRequired?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type Attendance = {
  __typename?: 'Attendance';
  checkDate?: Maybe<Scalars['String']['output']>;
  checkIn?: Maybe<Scalars['String']['output']>;
  checkOut?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  leave?: Maybe<Leave>;
  overTimeIn?: Maybe<Scalars['String']['output']>;
  overTimeOut?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type BankInfo = {
  __typename?: 'BankInfo';
  createdDate?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  updatedDate?: Maybe<Scalars['String']['output']>;
};

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Brand = {
  __typename?: 'Brand';
  id?: Maybe<Scalars['Int']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type BrandInput = {
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CartItemInput = {
  addons?: InputMaybe<Scalars['String']['input']>;
  discount?: InputMaybe<Scalars['Float']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  qty?: InputMaybe<Scalars['Int']['input']>;
  remark?: InputMaybe<Scalars['String']['input']>;
  skuId?: InputMaybe<Scalars['Int']['input']>;
};

export type Category = {
  __typename?: 'Category';
  id?: Maybe<Scalars['Int']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  root?: Maybe<Scalars['Int']['output']>;
};

export type CategoryIndexInput = {
  id: Scalars['Int']['input'];
  index: Scalars['Int']['input'];
};

export type CategoryInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  root?: InputMaybe<Scalars['Int']['input']>;
};

export type ChangeOrderInput = {
  amount?: InputMaybe<Scalars['String']['input']>;
  bankId?: InputMaybe<Scalars['Int']['input']>;
  bankType?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  customerPaid?: InputMaybe<Scalars['String']['input']>;
  deliverPickupCode?: InputMaybe<Scalars['String']['input']>;
  deliverPickupId?: InputMaybe<Scalars['Int']['input']>;
  discount?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  invoice?: InputMaybe<Scalars['Int']['input']>;
  itemStatus?: InputMaybe<StatusOrderItem>;
  orderId: Scalars['Int']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<StatusOrder>;
};

export type CurrencyShift = {
  __typename?: 'CurrencyShift';
  khr?: Maybe<Scalars['Float']['output']>;
  usd?: Maybe<Scalars['Float']['output']>;
};

export type CurrencyShiftInput = {
  khr?: InputMaybe<Scalars['Float']['input']>;
  usd?: InputMaybe<Scalars['Float']['input']>;
};

export type Delivery = {
  __typename?: 'Delivery';
  contact?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type DeliveryInput = {
  contact?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type FilterProduct = {
  category?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  isLowStock?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Array<InputMaybe<Status_Product>>>;
  type?: InputMaybe<Array<InputMaybe<Type_Product>>>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type Holiday = {
  __typename?: 'Holiday';
  date?: Maybe<Scalars['String']['output']>;
  extra?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type HolidayInput = {
  date?: InputMaybe<Scalars['String']['input']>;
  extra?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Integrate = {
  __typename?: 'Integrate';
  id?: Maybe<Scalars['Int']['output']>;
  integrate?: Maybe<Product>;
  product?: Maybe<Product>;
  qty?: Maybe<Scalars['String']['output']>;
};

export type IntegrateInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  integrateId?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  qty?: InputMaybe<Scalars['String']['input']>;
};

export type Leave = {
  __typename?: 'Leave';
  approvedBy?: Maybe<User>;
  approvedDate?: Maybe<Scalars['String']['output']>;
  cancelledBy?: Maybe<User>;
  cancelledDate?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  leaveReason?: Maybe<Scalars['String']['output']>;
  leaveType?: Maybe<Scalars['String']['output']>;
  rejectedBy?: Maybe<User>;
  rejectedDate?: Maybe<Scalars['String']['output']>;
  requestedBy?: Maybe<User>;
  requestedDate?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['String']['output']>;
  status?: Maybe<LeaveStatus>;
};

export type LeaveInput = {
  duration?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  leaveReason?: InputMaybe<Scalars['String']['input']>;
  leaveType?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<LeaveStatus>;
};

export enum LeaveStatus {
  Approved = 'APPROVED',
  Cancelled = 'CANCELLED',
  Rejected = 'REJECTED',
  Request = 'REQUEST'
}

export type Mutation = {
  __typename?: 'Mutation';
  addDiscountOrder?: Maybe<Scalars['Boolean']['output']>;
  addOrderItem?: Maybe<Scalars['Boolean']['output']>;
  changeOrderStatus?: Maybe<Scalars['Boolean']['output']>;
  checkAttendance?: Maybe<Scalars['Boolean']['output']>;
  checkProductCode?: Maybe<Scalars['Boolean']['output']>;
  createBank?: Maybe<Scalars['Boolean']['output']>;
  createBrand?: Maybe<Scalars['Boolean']['output']>;
  createCategory?: Maybe<Scalars['Boolean']['output']>;
  createDelivery?: Maybe<Scalars['Boolean']['output']>;
  createHoliday?: Maybe<Scalars['Boolean']['output']>;
  createLeave?: Maybe<Scalars['Boolean']['output']>;
  createOrder?: Maybe<Scalars['Int']['output']>;
  createOrderSchedule?: Maybe<Scalars['Boolean']['output']>;
  createOverTime?: Maybe<Scalars['Boolean']['output']>;
  createPosition?: Maybe<Scalars['Boolean']['output']>;
  createProduct?: Maybe<Scalars['Boolean']['output']>;
  createProductStock?: Maybe<Scalars['Boolean']['output']>;
  createShift?: Maybe<Scalars['Boolean']['output']>;
  createTransactionStock?: Maybe<Scalars['Boolean']['output']>;
  createUser?: Maybe<Scalars['Boolean']['output']>;
  decreaseOrderItem?: Maybe<Scalars['Boolean']['output']>;
  deleteOrderSchedule?: Maybe<Scalars['Boolean']['output']>;
  generateTableSet?: Maybe<Scalars['Boolean']['output']>;
  generateTokenOrder?: Maybe<Scalars['String']['output']>;
  increaseOrderItem?: Maybe<Scalars['Boolean']['output']>;
  login?: Maybe<Scalars['String']['output']>;
  markFirstPrintOrder?: Maybe<Scalars['Boolean']['output']>;
  markOrderItemStatus?: Maybe<Scalars['Boolean']['output']>;
  mergeOrder?: Maybe<Scalars['Boolean']['output']>;
  peopleInOrder?: Maybe<Scalars['Boolean']['output']>;
  resetPassword?: Maybe<Scalars['Boolean']['output']>;
  setItemShowOn?: Maybe<Scalars['Boolean']['output']>;
  setTypePaymentOrder?: Maybe<Scalars['Boolean']['output']>;
  signatureOrder?: Maybe<Scalars['Boolean']['output']>;
  swapOrderTable?: Maybe<Scalars['Boolean']['output']>;
  testSubscription?: Maybe<Scalars['Boolean']['output']>;
  updateBank?: Maybe<Scalars['Boolean']['output']>;
  updateBrand?: Maybe<Scalars['Boolean']['output']>;
  updateCategory?: Maybe<Scalars['Boolean']['output']>;
  updateCategoryIndex?: Maybe<Scalars['Boolean']['output']>;
  updateDelivery?: Maybe<Scalars['Boolean']['output']>;
  updateHoliday?: Maybe<Scalars['Boolean']['output']>;
  updateLeave?: Maybe<Scalars['Boolean']['output']>;
  updateLeaveStatus?: Maybe<Scalars['Boolean']['output']>;
  updateOrderSchedule?: Maybe<Scalars['Boolean']['output']>;
  updateOverTime?: Maybe<Scalars['Boolean']['output']>;
  updateOverTimeStatus?: Maybe<Scalars['Boolean']['output']>;
  updatePosition?: Maybe<Scalars['Boolean']['output']>;
  updateProduct?: Maybe<Scalars['Boolean']['output']>;
  updateProductStock?: Maybe<Scalars['Boolean']['output']>;
  updateSetting?: Maybe<Scalars['Boolean']['output']>;
  updateShift?: Maybe<Scalars['Boolean']['output']>;
  updateStatusProduct?: Maybe<Scalars['Boolean']['output']>;
  updateUser?: Maybe<Scalars['Boolean']['output']>;
  verifyOtpOrder?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationAddDiscountOrderArgs = {
  discount: Scalars['Float']['input'];
  id: Scalars['Int']['input'];
};


export type MutationAddOrderItemArgs = {
  data?: InputMaybe<CartItemInput>;
  orderId: Scalars['Int']['input'];
};


export type MutationChangeOrderStatusArgs = {
  data?: InputMaybe<ChangeOrderInput>;
};


export type MutationCheckAttendanceArgs = {
  date: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationCheckProductCodeArgs = {
  code: Scalars['String']['input'];
};


export type MutationCreateBankArgs = {
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateBrandArgs = {
  data?: InputMaybe<BrandInput>;
};


export type MutationCreateCategoryArgs = {
  data?: InputMaybe<CategoryInput>;
};


export type MutationCreateDeliveryArgs = {
  data?: InputMaybe<DeliveryInput>;
};


export type MutationCreateHolidayArgs = {
  data?: InputMaybe<HolidayInput>;
};


export type MutationCreateLeaveArgs = {
  data?: InputMaybe<LeaveInput>;
  userId: Scalars['Int']['input'];
};


export type MutationCreateOrderArgs = {
  data?: InputMaybe<OrderInput>;
};


export type MutationCreateOrderScheduleArgs = {
  data?: InputMaybe<OrderScheduleInput>;
};


export type MutationCreateOverTimeArgs = {
  data?: InputMaybe<OverTimeInput>;
  userId: Scalars['Int']['input'];
};


export type MutationCreatePositionArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateProductArgs = {
  data?: InputMaybe<ProductInput>;
};


export type MutationCreateProductStockArgs = {
  data?: InputMaybe<ProductStockInput>;
};


export type MutationCreateShiftArgs = {
  data?: InputMaybe<ShiftInput>;
};


export type MutationCreateTransactionStockArgs = {
  data?: InputMaybe<Array<InputMaybe<TransactionStockInput>>>;
};


export type MutationCreateUserArgs = {
  data?: InputMaybe<UserInput>;
};


export type MutationDecreaseOrderItemArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteOrderScheduleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationGenerateTableSetArgs = {
  sets: Scalars['Int']['input'];
};


export type MutationGenerateTokenOrderArgs = {
  set: Scalars['Int']['input'];
};


export type MutationIncreaseOrderItemArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationMarkFirstPrintOrderArgs = {
  orderId: Scalars['Int']['input'];
};


export type MutationMarkOrderItemStatusArgs = {
  id: Scalars['Int']['input'];
  status?: InputMaybe<StatusOrderItem>;
};


export type MutationMergeOrderArgs = {
  fromOrderId?: InputMaybe<Array<Scalars['Int']['input']>>;
  toOrderId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationPeopleInOrderArgs = {
  count: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
};


export type MutationResetPasswordArgs = {
  oldPassowrd: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationSetItemShowOnArgs = {
  productId: Scalars['Int']['input'];
  skuId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSetTypePaymentOrderArgs = {
  bankId?: InputMaybe<Scalars['Int']['input']>;
  bankType?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};


export type MutationSignatureOrderArgs = {
  id: Scalars['Int']['input'];
  password: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
  username: Scalars['String']['input'];
};


export type MutationSwapOrderTableArgs = {
  orderId: Scalars['Int']['input'];
  table?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTestSubscriptionArgs = {
  str?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateBankArgs = {
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateBrandArgs = {
  data?: InputMaybe<BrandInput>;
  id: Scalars['Int']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateCategoryArgs = {
  data?: InputMaybe<CategoryInput>;
  id: Scalars['Int']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateCategoryIndexArgs = {
  data?: InputMaybe<Array<InputMaybe<CategoryIndexInput>>>;
};


export type MutationUpdateDeliveryArgs = {
  data?: InputMaybe<DeliveryInput>;
  id: Scalars['Int']['input'];
};


export type MutationUpdateHolidayArgs = {
  data?: InputMaybe<HolidayInput>;
  id: Scalars['Int']['input'];
};


export type MutationUpdateLeaveArgs = {
  data?: InputMaybe<LeaveInput>;
  id: Scalars['Int']['input'];
};


export type MutationUpdateLeaveStatusArgs = {
  id: Scalars['Int']['input'];
  status?: InputMaybe<LeaveStatus>;
};


export type MutationUpdateOrderScheduleArgs = {
  data?: InputMaybe<OrderScheduleInput>;
  id: Scalars['Int']['input'];
};


export type MutationUpdateOverTimeArgs = {
  data?: InputMaybe<OverTimeInput>;
  id: Scalars['Int']['input'];
};


export type MutationUpdateOverTimeStatusArgs = {
  id: Scalars['Int']['input'];
  status?: InputMaybe<OverTimeStatus>;
};


export type MutationUpdatePositionArgs = {
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateProductArgs = {
  data?: InputMaybe<ProductInput>;
  id: Scalars['Int']['input'];
};


export type MutationUpdateProductStockArgs = {
  data?: InputMaybe<ProductStockInput>;
  id: Scalars['Int']['input'];
};


export type MutationUpdateSettingArgs = {
  option?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateShiftArgs = {
  data?: InputMaybe<ShiftInput>;
  expected?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
};


export type MutationUpdateStatusProductArgs = {
  id: Scalars['Int']['input'];
  status: Status_Product;
};


export type MutationUpdateUserArgs = {
  data?: InputMaybe<UserInput>;
  id: Scalars['Int']['input'];
};


export type MutationVerifyOtpOrderArgs = {
  code: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Order = {
  __typename?: 'Order';
  address?: Maybe<Scalars['String']['output']>;
  bankId?: Maybe<Scalars['Int']['output']>;
  bankType?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  customerPaid?: Maybe<Scalars['String']['output']>;
  delivery?: Maybe<Delivery>;
  deliveryCode?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<Scalars['Float']['output']>;
  firstPrint?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  invoice?: Maybe<Scalars['Int']['output']>;
  items?: Maybe<Array<Maybe<OrderItem>>>;
  log?: Maybe<Array<Maybe<OrderLog>>>;
  name?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  paid?: Maybe<Scalars['String']['output']>;
  person?: Maybe<Scalars['Int']['output']>;
  set?: Maybe<Scalars['String']['output']>;
  status?: Maybe<StatusOrder>;
  total?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  vat?: Maybe<Scalars['String']['output']>;
};

export type OrderInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['String']['input']>;
  bankId?: InputMaybe<Scalars['Int']['input']>;
  bankType?: InputMaybe<Scalars['String']['input']>;
  carts?: InputMaybe<Array<InputMaybe<CartItemInput>>>;
  currency?: InputMaybe<Scalars['String']['input']>;
  customerPaid?: InputMaybe<Scalars['String']['input']>;
  discount?: InputMaybe<Scalars['Float']['input']>;
  invoice?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  addons?: Maybe<Scalars['String']['output']>;
  createdDate?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isPrint?: Maybe<Scalars['Boolean']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Product>;
  qty?: Maybe<Scalars['Int']['output']>;
  remark?: Maybe<Scalars['String']['output']>;
  sku?: Maybe<Sku>;
  status?: Maybe<StatusOrderItem>;
};

export type OrderLog = {
  __typename?: 'OrderLog';
  by?: Maybe<User>;
  date?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

export type OrderSchedule = {
  __typename?: 'OrderSchedule';
  endAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  items?: Maybe<Array<Maybe<OrderScheduleItem>>>;
  name?: Maybe<Scalars['String']['output']>;
  startAt?: Maybe<Scalars['String']['output']>;
};

export type OrderScheduleInput = {
  endAt?: InputMaybe<Scalars['String']['input']>;
  items?: InputMaybe<Array<InputMaybe<OrderScheduleItemInput>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  startAt?: InputMaybe<Scalars['String']['input']>;
};

export type OrderScheduleItem = {
  __typename?: 'OrderScheduleItem';
  sku?: Maybe<Sku>;
};

export type OrderScheduleItemInput = {
  skuId?: InputMaybe<Scalars['Int']['input']>;
};

export enum OrderViewBy {
  Admin = 'ADMIN',
  Kitchen = 'KITCHEN',
  QuickOrder = 'QUICK_ORDER',
  User = 'USER'
}

export type OverTime = {
  __typename?: 'OverTime';
  approvedBy?: Maybe<User>;
  approvedDate?: Maybe<Scalars['String']['output']>;
  cancelledBy?: Maybe<User>;
  cancelledDate?: Maybe<Scalars['String']['output']>;
  endAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  otDate?: Maybe<Scalars['String']['output']>;
  rejectedBy?: Maybe<User>;
  rejectedDate?: Maybe<Scalars['String']['output']>;
  requestedBy?: Maybe<User>;
  requestedDate?: Maybe<Scalars['String']['output']>;
  startat?: Maybe<Scalars['String']['output']>;
  status?: Maybe<OverTimeStatus>;
};

export type OverTimeInput = {
  endAt?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  otDate?: InputMaybe<Scalars['String']['input']>;
  startat?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<OverTimeStatus>;
};

export enum OverTimeStatus {
  Approved = 'APPROVED',
  Cancelled = 'CANCELLED',
  Rejected = 'REJECTED',
  Request = 'REQUEST'
}

export type Position = {
  __typename?: 'Position';
  createdDate?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedDate?: Maybe<Scalars['String']['output']>;
};

export type Product = {
  __typename?: 'Product';
  addons?: Maybe<Array<Maybe<AddonProduct>>>;
  category?: Maybe<Category>;
  code?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  images?: Maybe<Scalars['String']['output']>;
  integrates?: Maybe<Array<Maybe<Integrate>>>;
  sku?: Maybe<Array<Maybe<Sku>>>;
  status?: Maybe<Status_Product>;
  stockAlter?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Array<Maybe<Type_Product>>>;
};

export type ProductInput = {
  addons?: InputMaybe<Array<InputMaybe<AddonInput>>>;
  category?: InputMaybe<Scalars['Int']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Scalars['String']['input']>;
  integrate?: InputMaybe<Array<InputMaybe<IntegrateInput>>>;
  sku?: InputMaybe<Array<InputMaybe<SkuInput>>>;
  stockAlter?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Array<InputMaybe<Type_Product>>>;
};

export type ProductSell = {
  __typename?: 'ProductSell';
  product?: Maybe<Product>;
  qty?: Maybe<Scalars['Int']['output']>;
  sku?: Maybe<Sku>;
  total?: Maybe<Scalars['Float']['output']>;
};

export type ProductStock = {
  __typename?: 'ProductStock';
  id?: Maybe<Scalars['Int']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Product>;
  qty?: Maybe<Scalars['Int']['output']>;
};

export type ProductStockInput = {
  location?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  qty?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  activityStaff?: Maybe<Scalars['JSON']['output']>;
  attendanceListAdmin?: Maybe<Array<Maybe<Attendance>>>;
  attendanceStaff?: Maybe<Array<Maybe<Attendance>>>;
  bankInfo?: Maybe<BankInfo>;
  books?: Maybe<Array<Maybe<Book>>>;
  brand?: Maybe<Brand>;
  brandList?: Maybe<Array<Maybe<Brand>>>;
  category?: Maybe<Category>;
  categoryList?: Maybe<Scalars['JSON']['output']>;
  checkHaveOpenShiftToday?: Maybe<Scalars['Boolean']['output']>;
  deliveryById?: Maybe<Delivery>;
  deliveryList?: Maybe<Array<Maybe<Delivery>>>;
  getAttendanceStaff?: Maybe<Array<Maybe<Attendance>>>;
  getAttendanceStaffToday?: Maybe<Attendance>;
  getLeaveAdmin?: Maybe<Scalars['JSON']['output']>;
  getPositionList?: Maybe<Array<Maybe<Position>>>;
  getSummaryAttendanceStaff?: Maybe<Scalars['JSON']['output']>;
  getbankList?: Maybe<Array<Maybe<BankInfo>>>;
  holiday?: Maybe<Holiday>;
  holidayList?: Maybe<Array<Maybe<Holiday>>>;
  leave?: Maybe<Leave>;
  leaveList?: Maybe<Array<Maybe<Leave>>>;
  me?: Maybe<User>;
  order?: Maybe<Order>;
  orderBalanceSummary?: Maybe<Scalars['JSON']['output']>;
  orderItem?: Maybe<Scalars['JSON']['output']>;
  orderList?: Maybe<Array<Maybe<Order>>>;
  orderSchedule?: Maybe<OrderSchedule>;
  orderScheduleList?: Maybe<Array<Maybe<OrderSchedule>>>;
  overTime?: Maybe<OverTime>;
  overTimeList?: Maybe<Array<Maybe<OverTime>>>;
  position?: Maybe<Position>;
  product?: Maybe<Product>;
  productList?: Maybe<Array<Maybe<Product>>>;
  productStock?: Maybe<ProductStock>;
  productStockList?: Maybe<Array<Maybe<ProductStock>>>;
  reportSaleByDay?: Maybe<Scalars['JSON']['output']>;
  reportSaleProduct?: Maybe<Scalars['JSON']['output']>;
  reportStaffPayroll?: Maybe<Scalars['JSON']['output']>;
  roleList?: Maybe<Array<Maybe<Role>>>;
  settingList?: Maybe<Array<Maybe<Setting>>>;
  shiftById?: Maybe<Shift>;
  shiftList?: Maybe<Array<Maybe<Shift>>>;
  tableSet?: Maybe<TableSet>;
  tableSetList?: Maybe<Array<Maybe<TableSet>>>;
  topProductSell?: Maybe<Array<Maybe<ProductSell>>>;
  transactionStockList?: Maybe<Array<Maybe<TransactionStock>>>;
  user?: Maybe<User>;
  userList?: Maybe<Array<Maybe<User>>>;
};


export type QueryActivityStaffArgs = {
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAttendanceListAdminArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  month: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  year: Scalars['Int']['input'];
};


export type QueryAttendanceStaffArgs = {
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['Int']['input'];
};


export type QueryBankInfoArgs = {
  id: Scalars['Int']['input'];
};


export type QueryBrandArgs = {
  id: Scalars['Int']['input'];
};


export type QueryBrandListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDeliveryByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDeliveryListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAttendanceStaffArgs = {
  from?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAttendanceStaffTodayArgs = {
  date: Scalars['String']['input'];
};


export type QueryGetPositionListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetSummaryAttendanceStaffArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryGetbankListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryHolidayArgs = {
  id: Scalars['Int']['input'];
};


export type QueryLeaveArgs = {
  id: Scalars['Int']['input'];
};


export type QueryLeaveListArgs = {
  admin?: InputMaybe<Scalars['Boolean']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Array<InputMaybe<LeaveStatus>>>;
  to?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOrderArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOrderBalanceSummaryArgs = {
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOrderItemArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOrderListArgs = {
  discount?: InputMaybe<Scalars['Boolean']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  sign?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Array<InputMaybe<StatusOrder>>>;
  toDate?: InputMaybe<Scalars['String']['input']>;
  viewBy?: InputMaybe<OrderViewBy>;
};


export type QueryOrderScheduleArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOverTimeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOverTimeListArgs = {
  from?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Array<InputMaybe<OverTimeStatus>>>;
  to?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPositionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductListArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  enabledOn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  filter?: InputMaybe<FilterProduct>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  schedule?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryProductStockArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductStockListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryReportSaleByDayArgs = {
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};


export type QueryReportSaleProductArgs = {
  filters?: InputMaybe<ReportSaleFilter>;
  from?: InputMaybe<Scalars['String']['input']>;
  groupBy?: InputMaybe<ReportSaleGroupBy>;
  to?: InputMaybe<Scalars['String']['input']>;
};


export type QueryReportStaffPayrollArgs = {
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};


export type QueryShiftByIdArgs = {
  date?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryShiftListArgs = {
  fromDate?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


export type QueryTableSetArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTableSetListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTopProductSellArgs = {
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  from?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTransactionStockListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  position?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ReportSaleFilter = {
  category?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export enum ReportSaleGroupBy {
  Date = 'DATE',
  Product = 'PRODUCT'
}

export type Role = {
  __typename?: 'Role';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Sku = {
  __typename?: 'SKU';
  discount?: Maybe<Scalars['Float']['output']>;
  enabledOn?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Product>;
  status?: Maybe<Status_Product>;
  unit?: Maybe<Scalars['String']['output']>;
};

export type SkuInput = {
  discount?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<Status_Product>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

export enum Status_Product {
  Available = 'AVAILABLE',
  Inactive = 'INACTIVE',
  OutOfStock = 'OUT_OF_STOCK',
  TimeOut = 'TIME_OUT'
}

export type Setting = {
  __typename?: 'Setting';
  option?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type Shift = {
  __typename?: 'Shift';
  bank?: Maybe<Scalars['JSON']['output']>;
  bill?: Maybe<Scalars['Int']['output']>;
  card?: Maybe<Scalars['Int']['output']>;
  close?: Maybe<Scalars['String']['output']>;
  closeCurrency?: Maybe<CurrencyShift>;
  customer?: Maybe<Scalars['String']['output']>;
  customerAvgCost?: Maybe<Scalars['String']['output']>;
  deposit?: Maybe<Scalars['String']['output']>;
  expectedCurrency?: Maybe<CurrencyShift>;
  id?: Maybe<Scalars['Int']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  open?: Maybe<Scalars['String']['output']>;
  openCurrency?: Maybe<CurrencyShift>;
  user?: Maybe<User>;
};

export type ShiftInput = {
  close?: InputMaybe<Scalars['String']['input']>;
  closeCurrency?: InputMaybe<CurrencyShiftInput>;
  deposit?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  open?: InputMaybe<Scalars['String']['input']>;
  openCurrency?: InputMaybe<CurrencyShiftInput>;
  userId: Scalars['Int']['input'];
};

export enum StatusOrder {
  Cancelled = 'CANCELLED',
  Checkout = 'CHECKOUT',
  Delivery = 'DELIVERY',
  Pending = 'PENDING',
  Verify = 'VERIFY'
}

export enum StatusOrderItem {
  Completed = 'COMPLETED',
  Deleted = 'DELETED',
  Making = 'MAKING',
  OutOfStock = 'OUT_OF_STOCK',
  Pending = 'PENDING',
  RequestChange = 'REQUEST_CHANGE'
}

export type Subscription = {
  __typename?: 'Subscription';
  newOrderPending?: Maybe<Scalars['String']['output']>;
  orderSubscript?: Maybe<Scalars['JSON']['output']>;
};


export type SubscriptionNewOrderPendingArgs = {
  channel?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionOrderSubscriptArgs = {
  channel?: InputMaybe<Scalars['String']['input']>;
};

export enum Type_Product {
  Addon = 'ADDON',
  Free = 'FREE',
  Freezing = 'FREEZING',
  Production = 'PRODUCTION',
  Raw = 'RAW',
  SecondHand = 'SECOND_HAND'
}

export type TableSet = {
  __typename?: 'TableSet';
  fake?: Maybe<Scalars['Boolean']['output']>;
  order?: Maybe<Order>;
  set?: Maybe<Scalars['Int']['output']>;
};

export type TransactionStock = {
  __typename?: 'TransactionStock';
  by?: Maybe<User>;
  date?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Product>;
  qty?: Maybe<Scalars['Int']['output']>;
  sku?: Maybe<Sku>;
  type?: Maybe<Scalars['String']['output']>;
};

export type TransactionStockInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['Int']['input'];
  qty?: InputMaybe<Scalars['Int']['input']>;
  skuId: Scalars['Int']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  bankAcc?: Maybe<Scalars['String']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
  bankType?: Maybe<Scalars['String']['output']>;
  baseSalary?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<Scalars['String']['output']>;
  createdDate?: Maybe<Scalars['String']['output']>;
  display?: Maybe<Scalars['String']['output']>;
  dob?: Maybe<Scalars['String']['output']>;
  fromTime?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  ownerId?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  startingAt?: Maybe<Scalars['String']['output']>;
  toTime?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserInput = {
  bankAcc?: InputMaybe<Scalars['String']['input']>;
  bankName?: InputMaybe<Scalars['String']['input']>;
  bankType?: InputMaybe<Scalars['String']['input']>;
  baseSalary?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  createdDate?: InputMaybe<Scalars['String']['input']>;
  display?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['String']['input']>;
  fromTime?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<Scalars['String']['input']>;
  roleId?: InputMaybe<Scalars['Int']['input']>;
  startingAt?: InputMaybe<Scalars['String']['input']>;
  toTime?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: string | null };

export type CreateProductMutationVariables = Exact<{
  data?: InputMaybe<ProductInput>;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct?: boolean | null };

export type UpdateProductMutationVariables = Exact<{
  updateProductId: Scalars['Int']['input'];
  data?: InputMaybe<ProductInput>;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct?: boolean | null };

export type UpdateCategoryMutationVariables = Exact<{
  updateCategoryId: Scalars['Int']['input'];
  data?: InputMaybe<CategoryInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory?: boolean | null };

export type CreateCategoryMutationVariables = Exact<{
  data?: InputMaybe<CategoryInput>;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory?: boolean | null };

export type CreateOrderMutationVariables = Exact<{
  data?: InputMaybe<OrderInput>;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder?: number | null };

export type AddOrderItemMutationVariables = Exact<{
  orderId: Scalars['Int']['input'];
  data?: InputMaybe<CartItemInput>;
}>;


export type AddOrderItemMutation = { __typename?: 'Mutation', addOrderItem?: boolean | null };

export type MarkOrderItemStatusMutationVariables = Exact<{
  markOrderItemStatusId: Scalars['Int']['input'];
  status?: InputMaybe<StatusOrderItem>;
}>;


export type MarkOrderItemStatusMutation = { __typename?: 'Mutation', markOrderItemStatus?: boolean | null };

export type IncreaseOrderItemMutationVariables = Exact<{
  increaseOrderItemId: Scalars['Int']['input'];
}>;


export type IncreaseOrderItemMutation = { __typename?: 'Mutation', increaseOrderItem?: boolean | null };

export type DecreaseOrderItemMutationVariables = Exact<{
  decreaseOrderItemId: Scalars['Int']['input'];
}>;


export type DecreaseOrderItemMutation = { __typename?: 'Mutation', decreaseOrderItem?: boolean | null };

export type ChangeOrderStatusMutationVariables = Exact<{
  data?: InputMaybe<ChangeOrderInput>;
}>;


export type ChangeOrderStatusMutation = { __typename?: 'Mutation', changeOrderStatus?: boolean | null };

export type GenerateTokenOrderMutationVariables = Exact<{
  set: Scalars['Int']['input'];
}>;


export type GenerateTokenOrderMutation = { __typename?: 'Mutation', generateTokenOrder?: string | null };

export type VerifyOtpOrderMutationVariables = Exact<{
  token: Scalars['String']['input'];
  code: Scalars['String']['input'];
}>;


export type VerifyOtpOrderMutation = { __typename?: 'Mutation', verifyOtpOrder?: boolean | null };

export type SignatureOrderMutationVariables = Exact<{
  signatureOrderId: Scalars['Int']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
}>;


export type SignatureOrderMutation = { __typename?: 'Mutation', signatureOrder?: boolean | null };

export type UpdateSettingMutationVariables = Exact<{
  option?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateSettingMutation = { __typename?: 'Mutation', updateSetting?: boolean | null };

export type GenerateTableSetMutationVariables = Exact<{
  sets: Scalars['Int']['input'];
}>;


export type GenerateTableSetMutation = { __typename?: 'Mutation', generateTableSet?: boolean | null };

export type CreateDeliveryMutationVariables = Exact<{
  data?: InputMaybe<DeliveryInput>;
}>;


export type CreateDeliveryMutation = { __typename?: 'Mutation', createDelivery?: boolean | null };

export type UpdateDeliveryMutationVariables = Exact<{
  updateDeliveryId: Scalars['Int']['input'];
  data?: InputMaybe<DeliveryInput>;
}>;


export type UpdateDeliveryMutation = { __typename?: 'Mutation', updateDelivery?: boolean | null };

export type CreateUserMutationVariables = Exact<{
  data?: InputMaybe<UserInput>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: boolean | null };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data?: InputMaybe<UserInput>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: boolean | null };

export type CreatePositionMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreatePositionMutation = { __typename?: 'Mutation', createPosition?: boolean | null };

export type UpdatePositionMutationVariables = Exact<{
  name: Scalars['String']['input'];
  updatePositionId: Scalars['Int']['input'];
}>;


export type UpdatePositionMutation = { __typename?: 'Mutation', updatePosition?: boolean | null };

export type CreateBankMutationVariables = Exact<{
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateBankMutation = { __typename?: 'Mutation', createBank?: boolean | null };

export type UpdateBankMutationVariables = Exact<{
  updateBankId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateBankMutation = { __typename?: 'Mutation', updateBank?: boolean | null };

export type CheckAttendanceMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  date: Scalars['String']['input'];
}>;


export type CheckAttendanceMutation = { __typename?: 'Mutation', checkAttendance?: boolean | null };

export type CreateShiftMutationVariables = Exact<{
  data?: InputMaybe<ShiftInput>;
}>;


export type CreateShiftMutation = { __typename?: 'Mutation', createShift?: boolean | null };

export type UpdateShiftMutationVariables = Exact<{
  updateShiftId: Scalars['Int']['input'];
  expected?: InputMaybe<Scalars['Boolean']['input']>;
  data?: InputMaybe<ShiftInput>;
}>;


export type UpdateShiftMutation = { __typename?: 'Mutation', updateShift?: boolean | null };

export type PeopleInOrderMutationVariables = Exact<{
  peopleInOrderId: Scalars['Int']['input'];
  count: Scalars['Int']['input'];
}>;


export type PeopleInOrderMutation = { __typename?: 'Mutation', peopleInOrder?: boolean | null };

export type CreateLeaveMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  data?: InputMaybe<LeaveInput>;
}>;


export type CreateLeaveMutation = { __typename?: 'Mutation', createLeave?: boolean | null };

export type UpdateLeaveMutationVariables = Exact<{
  updateLeaveId: Scalars['Int']['input'];
  data?: InputMaybe<LeaveInput>;
}>;


export type UpdateLeaveMutation = { __typename?: 'Mutation', updateLeave?: boolean | null };

export type UpdateLeaveStatusMutationVariables = Exact<{
  updateLeaveStatusId: Scalars['Int']['input'];
  status?: InputMaybe<LeaveStatus>;
}>;


export type UpdateLeaveStatusMutation = { __typename?: 'Mutation', updateLeaveStatus?: boolean | null };

export type CreateOverTimeMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  data?: InputMaybe<OverTimeInput>;
}>;


export type CreateOverTimeMutation = { __typename?: 'Mutation', createOverTime?: boolean | null };

export type UpdateOverTimeMutationVariables = Exact<{
  updateOverTimeId: Scalars['Int']['input'];
  data?: InputMaybe<OverTimeInput>;
}>;


export type UpdateOverTimeMutation = { __typename?: 'Mutation', updateOverTime?: boolean | null };

export type UpdateOverTimeStatusMutationVariables = Exact<{
  updateOverTimeStatusId: Scalars['Int']['input'];
  status?: InputMaybe<OverTimeStatus>;
}>;


export type UpdateOverTimeStatusMutation = { __typename?: 'Mutation', updateOverTimeStatus?: boolean | null };

export type UpdateStatusProductMutationVariables = Exact<{
  updateStatusProductId: Scalars['Int']['input'];
  status: Status_Product;
}>;


export type UpdateStatusProductMutation = { __typename?: 'Mutation', updateStatusProduct?: boolean | null };

export type AddDiscountOrderMutationVariables = Exact<{
  addDiscountOrderId: Scalars['Int']['input'];
  discount: Scalars['Float']['input'];
}>;


export type AddDiscountOrderMutation = { __typename?: 'Mutation', addDiscountOrder?: boolean | null };

export type SetTypePaymentOrderMutationVariables = Exact<{
  setTypePaymentOrderId: Scalars['Int']['input'];
  bankType?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  bankId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SetTypePaymentOrderMutation = { __typename?: 'Mutation', setTypePaymentOrder?: boolean | null };

export type SwapOrderTableMutationVariables = Exact<{
  orderId: Scalars['Int']['input'];
  table?: InputMaybe<Scalars['String']['input']>;
}>;


export type SwapOrderTableMutation = { __typename?: 'Mutation', swapOrderTable?: boolean | null };

export type CheckProductCodeMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type CheckProductCodeMutation = { __typename?: 'Mutation', checkProductCode?: boolean | null };

export type CreateHolidayMutationVariables = Exact<{
  data?: InputMaybe<HolidayInput>;
}>;


export type CreateHolidayMutation = { __typename?: 'Mutation', createHoliday?: boolean | null };

export type UpdateHolidayMutationVariables = Exact<{
  updateHolidayId: Scalars['Int']['input'];
  data?: InputMaybe<HolidayInput>;
}>;


export type UpdateHolidayMutation = { __typename?: 'Mutation', updateHoliday?: boolean | null };

export type CreateOrderScheduleMutationVariables = Exact<{
  data?: InputMaybe<OrderScheduleInput>;
}>;


export type CreateOrderScheduleMutation = { __typename?: 'Mutation', createOrderSchedule?: boolean | null };

export type UpdateOrderScheduleMutationVariables = Exact<{
  updateOrderScheduleId: Scalars['Int']['input'];
  data?: InputMaybe<OrderScheduleInput>;
}>;


export type UpdateOrderScheduleMutation = { __typename?: 'Mutation', updateOrderSchedule?: boolean | null };

export type DeleteOrderScheduleMutationVariables = Exact<{
  deleteOrderScheduleId: Scalars['Int']['input'];
}>;


export type DeleteOrderScheduleMutation = { __typename?: 'Mutation', deleteOrderSchedule?: boolean | null };

export type ResetPasswordMutationVariables = Exact<{
  username: Scalars['String']['input'];
  oldPassowrd: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: boolean | null };

export type SetItemShowOnMutationVariables = Exact<{
  productId: Scalars['Int']['input'];
  skuId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
}>;


export type SetItemShowOnMutation = { __typename?: 'Mutation', setItemShowOn?: boolean | null };

export type MarkFirstPrintOrderMutationVariables = Exact<{
  orderId: Scalars['Int']['input'];
}>;


export type MarkFirstPrintOrderMutation = { __typename?: 'Mutation', markFirstPrintOrder?: boolean | null };

export type CreateTransactionStockMutationVariables = Exact<{
  data?: InputMaybe<Array<InputMaybe<TransactionStockInput>> | InputMaybe<TransactionStockInput>>;
}>;


export type CreateTransactionStockMutation = { __typename?: 'Mutation', createTransactionStock?: boolean | null };

export type MergeOrderMutationVariables = Exact<{
  fromOrderId?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
  toOrderId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MergeOrderMutation = { __typename?: 'Mutation', mergeOrder?: boolean | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, display?: string | null, contact?: string | null, gender?: string | null, createdDate?: string | null, isActive?: boolean | null, ownerId?: string | null, startingAt?: string | null, bankName?: string | null, bankAcc?: string | null, bankType?: string | null, position?: string | null, baseSalary?: string | null, type?: string | null, profile?: string | null, username?: string | null, fromTime?: string | null, toTime?: string | null, role?: { __typename?: 'Role', name?: string | null, id?: number | null } | null } | null };

export type ProductListQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterProduct>;
  schedule?: InputMaybe<Scalars['Boolean']['input']>;
  enabledOn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type ProductListQuery = { __typename?: 'Query', productList?: Array<{ __typename?: 'Product', id?: number | null, title?: string | null, description?: string | null, type?: Array<Type_Product | null> | null, code?: string | null, images?: string | null, status?: Status_Product | null, category?: { __typename?: 'Category', id?: number | null, name?: string | null, root?: number | null } | null, sku?: Array<{ __typename?: 'SKU', id?: number | null, name?: string | null, price?: number | null, discount?: number | null, unit?: string | null, image?: string | null, status?: Status_Product | null, enabledOn?: string | null } | null> | null, addons?: Array<{ __typename?: 'AddonProduct', value?: string | null, name?: string | null, isRequired?: boolean | null, id?: number | null } | null> | null } | null> | null };

export type ProductQueryVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type ProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id?: number | null, title?: string | null, description?: string | null, type?: Array<Type_Product | null> | null, status?: Status_Product | null, stockAlter?: number | null, code?: string | null, images?: string | null, category?: { __typename?: 'Category', id?: number | null, name?: string | null, root?: number | null } | null, sku?: Array<{ __typename?: 'SKU', id?: number | null, name?: string | null, price?: number | null, discount?: number | null, unit?: string | null, image?: string | null, status?: Status_Product | null, enabledOn?: string | null } | null> | null, integrates?: Array<{ __typename?: 'Integrate', qty?: string | null, id?: number | null, product?: { __typename?: 'Product', title?: string | null, images?: string | null, id?: number | null } | null, integrate?: { __typename?: 'Product', id?: number | null, images?: string | null, title?: string | null } | null } | null> | null, addons?: Array<{ __typename?: 'AddonProduct', value?: string | null, name?: string | null, isRequired?: boolean | null, id?: number | null } | null> | null } | null };

export type CategoryListQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoryListQuery = { __typename?: 'Query', categoryList?: any | null };

export type CategoryQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;


export type CategoryQuery = { __typename?: 'Query', category?: { __typename?: 'Category', id?: number | null, name?: string | null, root?: number | null } | null };

export type OrderListQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  viewBy?: InputMaybe<OrderViewBy>;
  status?: InputMaybe<Array<InputMaybe<StatusOrder>> | InputMaybe<StatusOrder>>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  sign?: InputMaybe<Scalars['Boolean']['input']>;
  discount?: InputMaybe<Scalars['Boolean']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
}>;


export type OrderListQuery = { __typename?: 'Query', orderList?: Array<{ __typename?: 'Order', id?: number | null, code?: string | null, deliveryCode?: string | null, discount?: number | null, status?: StatusOrder | null, name?: string | null, paid?: string | null, set?: string | null, bankId?: number | null, currency?: string | null, total?: string | null, uuid?: string | null, note?: string | null, vat?: string | null, bankType?: string | null, invoice?: number | null, person?: number | null, delivery?: { __typename?: 'Delivery', id?: number | null, name?: string | null, contact?: string | null } | null, items?: Array<{ __typename?: 'OrderItem', id?: number | null, price?: number | null, qty?: number | null, discount?: number | null, addons?: string | null, remark?: string | null, status?: StatusOrderItem | null, createdDate?: string | null, product?: { __typename?: 'Product', id?: number | null, images?: string | null, title?: string | null, code?: string | null } | null, sku?: { __typename?: 'SKU', name?: string | null, image?: string | null } | null } | null> | null, log?: Array<{ __typename?: 'OrderLog', date?: string | null, text?: string | null, by?: { __typename?: 'User', id: number, display?: string | null } | null } | null> | null } | null> | null };

export type OrderQueryVariables = Exact<{
  token?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type OrderQuery = { __typename?: 'Query', order?: { __typename?: 'Order', id?: number | null, address?: string | null, status?: StatusOrder | null, bankId?: number | null, customerPaid?: string | null, name?: string | null, paid?: string | null, set?: string | null, total?: string | null, uuid?: string | null, note?: string | null, code?: string | null, discount?: number | null, vat?: string | null, person?: number | null, currency?: string | null, invoice?: number | null, bankType?: string | null, firstPrint?: boolean | null, deliveryCode?: string | null, log?: Array<{ __typename?: 'OrderLog', date?: string | null, text?: string | null, by?: { __typename?: 'User', id: number, display?: string | null } | null } | null> | null, delivery?: { __typename?: 'Delivery', id?: number | null, name?: string | null, contact?: string | null } | null, items?: Array<{ __typename?: 'OrderItem', createdDate?: string | null, id?: number | null, qty?: number | null, price?: number | null, discount?: number | null, status?: StatusOrderItem | null, addons?: string | null, remark?: string | null, isPrint?: boolean | null, sku?: { __typename?: 'SKU', price?: number | null, discount?: number | null, id?: number | null, unit?: string | null, name?: string | null, image?: string | null } | null, product?: { __typename?: 'Product', title?: string | null, images?: string | null, code?: string | null, description?: string | null, id?: number | null } | null } | null> | null } | null };

export type SettingListQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingListQuery = { __typename?: 'Query', settingList?: Array<{ __typename?: 'Setting', value?: string | null, type?: string | null, option?: string | null } | null> | null };

export type DeliveryListQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeliveryListQuery = { __typename?: 'Query', deliveryList?: Array<{ __typename?: 'Delivery', contact?: string | null, id?: number | null, name?: string | null } | null> | null };

export type TableSetListQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type TableSetListQuery = { __typename?: 'Query', tableSetList?: Array<{ __typename?: 'TableSet', set?: number | null, fake?: boolean | null, order?: { __typename?: 'Order', id?: number | null, uuid?: string | null, status?: StatusOrder | null, code?: string | null, firstPrint?: boolean | null, items?: Array<{ __typename?: 'OrderItem', id?: number | null, status?: StatusOrderItem | null, isPrint?: boolean | null, qty?: number | null, price?: number | null, discount?: number | null, product?: { __typename?: 'Product', id?: number | null, title?: string | null, images?: string | null } | null, sku?: { __typename?: 'SKU', id?: number | null, name?: string | null, image?: string | null } | null } | null> | null } | null } | null> | null };

export type DeliveryByIdQueryVariables = Exact<{
  deliveryByIdId: Scalars['Int']['input'];
}>;


export type DeliveryByIdQuery = { __typename?: 'Query', deliveryById?: { __typename?: 'Delivery', contact?: string | null, id?: number | null, name?: string | null } | null };

export type GetPositionListQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPositionListQuery = { __typename?: 'Query', getPositionList?: Array<{ __typename?: 'Position', createdDate?: string | null, id?: number | null, name?: string | null, updatedDate?: string | null } | null> | null };

export type PositionQueryVariables = Exact<{
  positionId: Scalars['Int']['input'];
}>;


export type PositionQuery = { __typename?: 'Query', position?: { __typename?: 'Position', createdDate?: string | null, id?: number | null, name?: string | null, updatedDate?: string | null } | null };

export type BankInfoQueryVariables = Exact<{
  bankInfoId: Scalars['Int']['input'];
}>;


export type BankInfoQuery = { __typename?: 'Query', bankInfo?: { __typename?: 'BankInfo', createdDate?: string | null, id?: number | null, name?: string | null, phone?: string | null, updatedDate?: string | null } | null };

export type GetbankListQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetbankListQuery = { __typename?: 'Query', getbankList?: Array<{ __typename?: 'BankInfo', createdDate?: string | null, id?: number | null, name?: string | null, phone?: string | null, updatedDate?: string | null } | null> | null };

export type UserQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, display?: string | null, gender?: string | null, dob?: string | null, contact?: string | null, ownerId?: string | null, position?: string | null, startingAt?: string | null, type?: string | null, username?: string | null, password?: string | null, profile?: string | null, baseSalary?: string | null, createdDate?: string | null, bankType?: string | null, bankName?: string | null, bankAcc?: string | null, isActive?: boolean | null, fromTime?: string | null, toTime?: string | null, role?: { __typename?: 'Role', id?: number | null, name?: string | null } | null } | null };

export type UserListQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
}>;


export type UserListQuery = { __typename?: 'Query', userList?: Array<{ __typename?: 'User', id: number, display?: string | null, gender?: string | null, dob?: string | null, contact?: string | null, ownerId?: string | null, position?: string | null, startingAt?: string | null, type?: string | null, username?: string | null, password?: string | null, profile?: string | null, baseSalary?: string | null, createdDate?: string | null, bankType?: string | null, bankName?: string | null, bankAcc?: string | null, isActive?: boolean | null, fromTime?: string | null, toTime?: string | null, role?: { __typename?: 'Role', id?: number | null, name?: string | null } | null } | null> | null };

export type RoleListQueryVariables = Exact<{ [key: string]: never; }>;


export type RoleListQuery = { __typename?: 'Query', roleList?: Array<{ __typename?: 'Role', id?: number | null, name?: string | null } | null> | null };

export type GetAttendanceStaffTodayQueryVariables = Exact<{
  date: Scalars['String']['input'];
}>;


export type GetAttendanceStaffTodayQuery = { __typename?: 'Query', getAttendanceStaffToday?: { __typename?: 'Attendance', id?: number | null, checkIn?: string | null, checkOut?: string | null, overTimeIn?: string | null, overTimeOut?: string | null, checkDate?: string | null, user?: { __typename?: 'User', id: number, display?: string | null } | null } | null };

export type GetAttendanceStaffQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAttendanceStaffQuery = { __typename?: 'Query', getAttendanceStaff?: Array<{ __typename?: 'Attendance', id?: number | null, checkIn?: string | null, checkOut?: string | null, overTimeIn?: string | null, overTimeOut?: string | null, checkDate?: string | null, type?: string | null, user?: { __typename?: 'User', id: number, display?: string | null } | null, leave?: { __typename?: 'Leave', id?: number | null, startDate?: string | null, endDate?: string | null, leaveReason?: string | null, leaveType?: string | null, approvedDate?: string | null, approvedBy?: { __typename?: 'User', id: number, display?: string | null } | null } | null } | null> | null };

export type ShiftListQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
}>;


export type ShiftListQuery = { __typename?: 'Query', shiftList?: Array<{ __typename?: 'Shift', id?: number | null, open?: string | null, close?: string | null, card?: number | null, bill?: number | null, bank?: any | null, deposit?: string | null, note?: string | null, customer?: string | null, customerAvgCost?: string | null, openCurrency?: { __typename?: 'CurrencyShift', khr?: number | null, usd?: number | null } | null, closeCurrency?: { __typename?: 'CurrencyShift', usd?: number | null, khr?: number | null } | null, expectedCurrency?: { __typename?: 'CurrencyShift', usd?: number | null, khr?: number | null } | null, user?: { __typename?: 'User', id: number, username?: string | null, display?: string | null, profile?: string | null } | null } | null> | null };

export type ShiftByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ShiftByIdQuery = { __typename?: 'Query', shiftById?: { __typename?: 'Shift', id?: number | null, open?: string | null, close?: string | null, card?: number | null, bill?: number | null, bank?: any | null, deposit?: string | null, note?: string | null, customer?: string | null, customerAvgCost?: string | null, openCurrency?: { __typename?: 'CurrencyShift', khr?: number | null, usd?: number | null } | null, closeCurrency?: { __typename?: 'CurrencyShift', usd?: number | null, khr?: number | null } | null, expectedCurrency?: { __typename?: 'CurrencyShift', usd?: number | null, khr?: number | null } | null, user?: { __typename?: 'User', id: number, username?: string | null, display?: string | null, profile?: string | null } | null } | null };

export type LeaveListQueryVariables = Exact<{
  to?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Array<InputMaybe<LeaveStatus>> | InputMaybe<LeaveStatus>>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type LeaveListQuery = { __typename?: 'Query', leaveList?: Array<{ __typename?: 'Leave', id?: number | null, startDate?: string | null, endDate?: string | null, duration?: string | null, leaveReason?: string | null, leaveType?: string | null, status?: LeaveStatus | null, rejectedDate?: string | null, requestedDate?: string | null, approvedDate?: string | null, cancelledDate?: string | null, rejectedBy?: { __typename?: 'User', id: number, display?: string | null, profile?: string | null } | null, requestedBy?: { __typename?: 'User', id: number, display?: string | null, profile?: string | null } | null, approvedBy?: { __typename?: 'User', id: number, display?: string | null, profile?: string | null } | null, cancelledBy?: { __typename?: 'User', id: number, display?: string | null, profile?: string | null } | null } | null> | null };

export type LeaveQueryVariables = Exact<{
  leaveId: Scalars['Int']['input'];
}>;


export type LeaveQuery = { __typename?: 'Query', leave?: { __typename?: 'Leave', id?: number | null, startDate?: string | null, endDate?: string | null, duration?: string | null, leaveReason?: string | null, leaveType?: string | null, status?: LeaveStatus | null, rejectedDate?: string | null, requestedDate?: string | null, approvedDate?: string | null, cancelledDate?: string | null, rejectedBy?: { __typename?: 'User', id: number, display?: string | null, profile?: string | null } | null, requestedBy?: { __typename?: 'User', id: number, display?: string | null, profile?: string | null } | null, approvedBy?: { __typename?: 'User', id: number, display?: string | null, profile?: string | null } | null, cancelledBy?: { __typename?: 'User', id: number, display?: string | null, profile?: string | null } | null } | null };

export type AttendanceListAdminQueryVariables = Exact<{
  month: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
}>;


export type AttendanceListAdminQuery = { __typename?: 'Query', attendanceListAdmin?: Array<{ __typename?: 'Attendance', checkIn?: string | null, checkOut?: string | null, checkDate?: string | null, id?: number | null, type?: string | null, overTimeOut?: string | null, overTimeIn?: string | null, user?: { __typename?: 'User', id: number, display?: string | null, profile?: string | null, fromTime?: string | null, toTime?: string | null } | null, leave?: { __typename?: 'Leave', id?: number | null, startDate?: string | null, endDate?: string | null, leaveReason?: string | null, leaveType?: string | null, approvedDate?: string | null, approvedBy?: { __typename?: 'User', id: number, display?: string | null } | null } | null } | null> | null };

export type GetSummaryAttendanceStaffQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetSummaryAttendanceStaffQuery = { __typename?: 'Query', getSummaryAttendanceStaff?: any | null };

export type OverTimeListQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Array<InputMaybe<OverTimeStatus>> | InputMaybe<OverTimeStatus>>;
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
}>;


export type OverTimeListQuery = { __typename?: 'Query', overTimeList?: Array<{ __typename?: 'OverTime', id?: number | null, startat?: string | null, endAt?: string | null, otDate?: string | null, note?: string | null, status?: OverTimeStatus | null, approvedDate?: string | null, requestedDate?: string | null, rejectedDate?: string | null, cancelledDate?: string | null, approvedBy?: { __typename?: 'User', id: number, display?: string | null, profile?: string | null } | null, rejectedBy?: { __typename?: 'User', id: number, display?: string | null, profile?: string | null } | null, requestedBy?: { __typename?: 'User', id: number, display?: string | null, profile?: string | null } | null, cancelledBy?: { __typename?: 'User', id: number, display?: string | null, profile?: string | null } | null } | null> | null };

export type OverTimeQueryVariables = Exact<{
  overTimeId: Scalars['Int']['input'];
}>;


export type OverTimeQuery = { __typename?: 'Query', overTime?: { __typename?: 'OverTime', id?: number | null, startat?: string | null, endAt?: string | null, otDate?: string | null, note?: string | null, status?: OverTimeStatus | null, approvedDate?: string | null, requestedDate?: string | null, rejectedDate?: string | null, cancelledDate?: string | null, approvedBy?: { __typename?: 'User', id: number, display?: string | null, profile?: string | null } | null, rejectedBy?: { __typename?: 'User', id: number, display?: string | null, profile?: string | null } | null, requestedBy?: { __typename?: 'User', id: number, display?: string | null, profile?: string | null } | null, cancelledBy?: { __typename?: 'User', id: number, display?: string | null, profile?: string | null } | null } | null };

export type OrderBalanceSummaryQueryVariables = Exact<{
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
}>;


export type OrderBalanceSummaryQuery = { __typename?: 'Query', orderBalanceSummary?: any | null };

export type TopProductSellQueryVariables = Exact<{
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type TopProductSellQuery = { __typename?: 'Query', topProductSell?: Array<{ __typename?: 'ProductSell', qty?: number | null, total?: number | null, product?: { __typename?: 'Product', id?: number | null, code?: string | null, title?: string | null, images?: string | null } | null, sku?: { __typename?: 'SKU', id?: number | null, name?: string | null, image?: string | null, price?: number | null, discount?: number | null, unit?: string | null } | null } | null> | null };

export type OrderItemQueryVariables = Exact<{
  orderItemId: Scalars['Int']['input'];
}>;


export type OrderItemQuery = { __typename?: 'Query', orderItem?: any | null };

export type ReportSaleByDayQueryVariables = Exact<{
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
}>;


export type ReportSaleByDayQuery = { __typename?: 'Query', reportSaleByDay?: any | null };

export type ReportStaffPayrollQueryVariables = Exact<{
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
}>;


export type ReportStaffPayrollQuery = { __typename?: 'Query', reportStaffPayroll?: any | null };

export type HolidayListQueryVariables = Exact<{ [key: string]: never; }>;


export type HolidayListQuery = { __typename?: 'Query', holidayList?: Array<{ __typename?: 'Holiday', date?: string | null, extra?: number | null, id?: number | null, name?: string | null } | null> | null };

export type HolidayQueryVariables = Exact<{
  holidayId: Scalars['Int']['input'];
}>;


export type HolidayQuery = { __typename?: 'Query', holiday?: { __typename?: 'Holiday', id?: number | null, name?: string | null, date?: string | null, extra?: number | null } | null };

export type ReportSaleProductQueryVariables = Exact<{
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<ReportSaleFilter>;
  groupBy?: InputMaybe<ReportSaleGroupBy>;
}>;


export type ReportSaleProductQuery = { __typename?: 'Query', reportSaleProduct?: any | null };

export type OrderScheduleListQueryVariables = Exact<{ [key: string]: never; }>;


export type OrderScheduleListQuery = { __typename?: 'Query', orderScheduleList?: Array<{ __typename?: 'OrderSchedule', id?: number | null, startAt?: string | null, endAt?: string | null, name?: string | null, items?: Array<{ __typename?: 'OrderScheduleItem', sku?: { __typename?: 'SKU', id?: number | null, image?: string | null, price?: number | null, discount?: number | null, product?: { __typename?: 'Product', id?: number | null, images?: string | null, title?: string | null } | null } | null } | null> | null } | null> | null };

export type OrderScheduleQueryVariables = Exact<{
  orderScheduleId: Scalars['Int']['input'];
}>;


export type OrderScheduleQuery = { __typename?: 'Query', orderSchedule?: { __typename?: 'OrderSchedule', id?: number | null, startAt?: string | null, endAt?: string | null, name?: string | null, items?: Array<{ __typename?: 'OrderScheduleItem', sku?: { __typename?: 'SKU', id?: number | null, image?: string | null, price?: number | null, discount?: number | null, product?: { __typename?: 'Product', id?: number | null, images?: string | null, title?: string | null } | null } | null } | null> | null } | null };

export type CheckHaveOpenShiftTodayQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckHaveOpenShiftTodayQuery = { __typename?: 'Query', checkHaveOpenShiftToday?: boolean | null };

export type TransactionStockListQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type TransactionStockListQuery = { __typename?: 'Query', transactionStockList?: Array<{ __typename?: 'TransactionStock', id?: string | null, type?: string | null, qty?: number | null, date?: string | null, product?: { __typename?: 'Product', id?: number | null, code?: string | null, images?: string | null, title?: string | null, description?: string | null } | null, sku?: { __typename?: 'SKU', id?: number | null, unit?: string | null, price?: number | null, discount?: number | null, name?: string | null, image?: string | null } | null, by?: { __typename?: 'User', id: number, display?: string | null } | null } | null> | null };

export type SubscriptionLoadSubscriptionVariables = Exact<{
  channel?: InputMaybe<Scalars['String']['input']>;
}>;


export type SubscriptionLoadSubscription = { __typename?: 'Subscription', newOrderPending?: string | null };

export type OrderSubscriptSubscriptionVariables = Exact<{
  channel?: InputMaybe<Scalars['String']['input']>;
}>;


export type OrderSubscriptSubscription = { __typename?: 'Subscription', orderSubscript?: any | null };


export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateProductDocument = gql`
    mutation createProduct($data: ProductInput) {
  createProduct(data: $data)
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = gql`
    mutation updateProduct($updateProductId: Int!, $data: ProductInput) {
  updateProduct(id: $updateProductId, data: $data)
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      updateProductId: // value for 'updateProductId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation updateCategory($updateCategoryId: Int!, $data: CategoryInput, $isActive: Boolean) {
  updateCategory(id: $updateCategoryId, data: $data, isActive: $isActive)
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      updateCategoryId: // value for 'updateCategoryId'
 *      data: // value for 'data'
 *      isActive: // value for 'isActive'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation createCategory($data: CategoryInput) {
  createCategory(data: $data)
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const CreateOrderDocument = gql`
    mutation createOrder($data: OrderInput) {
  createOrder(data: $data)
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const AddOrderItemDocument = gql`
    mutation addOrderItem($orderId: Int!, $data: CartItemInput) {
  addOrderItem(orderId: $orderId, data: $data)
}
    `;
export type AddOrderItemMutationFn = Apollo.MutationFunction<AddOrderItemMutation, AddOrderItemMutationVariables>;

/**
 * __useAddOrderItemMutation__
 *
 * To run a mutation, you first call `useAddOrderItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrderItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrderItemMutation, { data, loading, error }] = useAddOrderItemMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddOrderItemMutation(baseOptions?: Apollo.MutationHookOptions<AddOrderItemMutation, AddOrderItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrderItemMutation, AddOrderItemMutationVariables>(AddOrderItemDocument, options);
      }
export type AddOrderItemMutationHookResult = ReturnType<typeof useAddOrderItemMutation>;
export type AddOrderItemMutationResult = Apollo.MutationResult<AddOrderItemMutation>;
export type AddOrderItemMutationOptions = Apollo.BaseMutationOptions<AddOrderItemMutation, AddOrderItemMutationVariables>;
export const MarkOrderItemStatusDocument = gql`
    mutation markOrderItemStatus($markOrderItemStatusId: Int!, $status: StatusOrderItem) {
  markOrderItemStatus(id: $markOrderItemStatusId, status: $status)
}
    `;
export type MarkOrderItemStatusMutationFn = Apollo.MutationFunction<MarkOrderItemStatusMutation, MarkOrderItemStatusMutationVariables>;

/**
 * __useMarkOrderItemStatusMutation__
 *
 * To run a mutation, you first call `useMarkOrderItemStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkOrderItemStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markOrderItemStatusMutation, { data, loading, error }] = useMarkOrderItemStatusMutation({
 *   variables: {
 *      markOrderItemStatusId: // value for 'markOrderItemStatusId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useMarkOrderItemStatusMutation(baseOptions?: Apollo.MutationHookOptions<MarkOrderItemStatusMutation, MarkOrderItemStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkOrderItemStatusMutation, MarkOrderItemStatusMutationVariables>(MarkOrderItemStatusDocument, options);
      }
export type MarkOrderItemStatusMutationHookResult = ReturnType<typeof useMarkOrderItemStatusMutation>;
export type MarkOrderItemStatusMutationResult = Apollo.MutationResult<MarkOrderItemStatusMutation>;
export type MarkOrderItemStatusMutationOptions = Apollo.BaseMutationOptions<MarkOrderItemStatusMutation, MarkOrderItemStatusMutationVariables>;
export const IncreaseOrderItemDocument = gql`
    mutation increaseOrderItem($increaseOrderItemId: Int!) {
  increaseOrderItem(id: $increaseOrderItemId)
}
    `;
export type IncreaseOrderItemMutationFn = Apollo.MutationFunction<IncreaseOrderItemMutation, IncreaseOrderItemMutationVariables>;

/**
 * __useIncreaseOrderItemMutation__
 *
 * To run a mutation, you first call `useIncreaseOrderItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncreaseOrderItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [increaseOrderItemMutation, { data, loading, error }] = useIncreaseOrderItemMutation({
 *   variables: {
 *      increaseOrderItemId: // value for 'increaseOrderItemId'
 *   },
 * });
 */
export function useIncreaseOrderItemMutation(baseOptions?: Apollo.MutationHookOptions<IncreaseOrderItemMutation, IncreaseOrderItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IncreaseOrderItemMutation, IncreaseOrderItemMutationVariables>(IncreaseOrderItemDocument, options);
      }
export type IncreaseOrderItemMutationHookResult = ReturnType<typeof useIncreaseOrderItemMutation>;
export type IncreaseOrderItemMutationResult = Apollo.MutationResult<IncreaseOrderItemMutation>;
export type IncreaseOrderItemMutationOptions = Apollo.BaseMutationOptions<IncreaseOrderItemMutation, IncreaseOrderItemMutationVariables>;
export const DecreaseOrderItemDocument = gql`
    mutation decreaseOrderItem($decreaseOrderItemId: Int!) {
  decreaseOrderItem(id: $decreaseOrderItemId)
}
    `;
export type DecreaseOrderItemMutationFn = Apollo.MutationFunction<DecreaseOrderItemMutation, DecreaseOrderItemMutationVariables>;

/**
 * __useDecreaseOrderItemMutation__
 *
 * To run a mutation, you first call `useDecreaseOrderItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDecreaseOrderItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [decreaseOrderItemMutation, { data, loading, error }] = useDecreaseOrderItemMutation({
 *   variables: {
 *      decreaseOrderItemId: // value for 'decreaseOrderItemId'
 *   },
 * });
 */
export function useDecreaseOrderItemMutation(baseOptions?: Apollo.MutationHookOptions<DecreaseOrderItemMutation, DecreaseOrderItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DecreaseOrderItemMutation, DecreaseOrderItemMutationVariables>(DecreaseOrderItemDocument, options);
      }
export type DecreaseOrderItemMutationHookResult = ReturnType<typeof useDecreaseOrderItemMutation>;
export type DecreaseOrderItemMutationResult = Apollo.MutationResult<DecreaseOrderItemMutation>;
export type DecreaseOrderItemMutationOptions = Apollo.BaseMutationOptions<DecreaseOrderItemMutation, DecreaseOrderItemMutationVariables>;
export const ChangeOrderStatusDocument = gql`
    mutation changeOrderStatus($data: ChangeOrderInput) {
  changeOrderStatus(data: $data)
}
    `;
export type ChangeOrderStatusMutationFn = Apollo.MutationFunction<ChangeOrderStatusMutation, ChangeOrderStatusMutationVariables>;

/**
 * __useChangeOrderStatusMutation__
 *
 * To run a mutation, you first call `useChangeOrderStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeOrderStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeOrderStatusMutation, { data, loading, error }] = useChangeOrderStatusMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeOrderStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeOrderStatusMutation, ChangeOrderStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeOrderStatusMutation, ChangeOrderStatusMutationVariables>(ChangeOrderStatusDocument, options);
      }
export type ChangeOrderStatusMutationHookResult = ReturnType<typeof useChangeOrderStatusMutation>;
export type ChangeOrderStatusMutationResult = Apollo.MutationResult<ChangeOrderStatusMutation>;
export type ChangeOrderStatusMutationOptions = Apollo.BaseMutationOptions<ChangeOrderStatusMutation, ChangeOrderStatusMutationVariables>;
export const GenerateTokenOrderDocument = gql`
    mutation generateTokenOrder($set: Int!) {
  generateTokenOrder(set: $set)
}
    `;
export type GenerateTokenOrderMutationFn = Apollo.MutationFunction<GenerateTokenOrderMutation, GenerateTokenOrderMutationVariables>;

/**
 * __useGenerateTokenOrderMutation__
 *
 * To run a mutation, you first call `useGenerateTokenOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateTokenOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateTokenOrderMutation, { data, loading, error }] = useGenerateTokenOrderMutation({
 *   variables: {
 *      set: // value for 'set'
 *   },
 * });
 */
export function useGenerateTokenOrderMutation(baseOptions?: Apollo.MutationHookOptions<GenerateTokenOrderMutation, GenerateTokenOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateTokenOrderMutation, GenerateTokenOrderMutationVariables>(GenerateTokenOrderDocument, options);
      }
export type GenerateTokenOrderMutationHookResult = ReturnType<typeof useGenerateTokenOrderMutation>;
export type GenerateTokenOrderMutationResult = Apollo.MutationResult<GenerateTokenOrderMutation>;
export type GenerateTokenOrderMutationOptions = Apollo.BaseMutationOptions<GenerateTokenOrderMutation, GenerateTokenOrderMutationVariables>;
export const VerifyOtpOrderDocument = gql`
    mutation verifyOtpOrder($token: String!, $code: String!) {
  verifyOtpOrder(token: $token, code: $code)
}
    `;
export type VerifyOtpOrderMutationFn = Apollo.MutationFunction<VerifyOtpOrderMutation, VerifyOtpOrderMutationVariables>;

/**
 * __useVerifyOtpOrderMutation__
 *
 * To run a mutation, you first call `useVerifyOtpOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyOtpOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyOtpOrderMutation, { data, loading, error }] = useVerifyOtpOrderMutation({
 *   variables: {
 *      token: // value for 'token'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useVerifyOtpOrderMutation(baseOptions?: Apollo.MutationHookOptions<VerifyOtpOrderMutation, VerifyOtpOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyOtpOrderMutation, VerifyOtpOrderMutationVariables>(VerifyOtpOrderDocument, options);
      }
export type VerifyOtpOrderMutationHookResult = ReturnType<typeof useVerifyOtpOrderMutation>;
export type VerifyOtpOrderMutationResult = Apollo.MutationResult<VerifyOtpOrderMutation>;
export type VerifyOtpOrderMutationOptions = Apollo.BaseMutationOptions<VerifyOtpOrderMutation, VerifyOtpOrderMutationVariables>;
export const SignatureOrderDocument = gql`
    mutation signatureOrder($signatureOrderId: Int!, $password: String!, $username: String!, $userId: Int!) {
  signatureOrder(
    id: $signatureOrderId
    password: $password
    username: $username
    userId: $userId
  )
}
    `;
export type SignatureOrderMutationFn = Apollo.MutationFunction<SignatureOrderMutation, SignatureOrderMutationVariables>;

/**
 * __useSignatureOrderMutation__
 *
 * To run a mutation, you first call `useSignatureOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignatureOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signatureOrderMutation, { data, loading, error }] = useSignatureOrderMutation({
 *   variables: {
 *      signatureOrderId: // value for 'signatureOrderId'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useSignatureOrderMutation(baseOptions?: Apollo.MutationHookOptions<SignatureOrderMutation, SignatureOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignatureOrderMutation, SignatureOrderMutationVariables>(SignatureOrderDocument, options);
      }
export type SignatureOrderMutationHookResult = ReturnType<typeof useSignatureOrderMutation>;
export type SignatureOrderMutationResult = Apollo.MutationResult<SignatureOrderMutation>;
export type SignatureOrderMutationOptions = Apollo.BaseMutationOptions<SignatureOrderMutation, SignatureOrderMutationVariables>;
export const UpdateSettingDocument = gql`
    mutation updateSetting($option: String, $value: String) {
  updateSetting(option: $option, value: $value)
}
    `;
export type UpdateSettingMutationFn = Apollo.MutationFunction<UpdateSettingMutation, UpdateSettingMutationVariables>;

/**
 * __useUpdateSettingMutation__
 *
 * To run a mutation, you first call `useUpdateSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSettingMutation, { data, loading, error }] = useUpdateSettingMutation({
 *   variables: {
 *      option: // value for 'option'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useUpdateSettingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSettingMutation, UpdateSettingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSettingMutation, UpdateSettingMutationVariables>(UpdateSettingDocument, options);
      }
export type UpdateSettingMutationHookResult = ReturnType<typeof useUpdateSettingMutation>;
export type UpdateSettingMutationResult = Apollo.MutationResult<UpdateSettingMutation>;
export type UpdateSettingMutationOptions = Apollo.BaseMutationOptions<UpdateSettingMutation, UpdateSettingMutationVariables>;
export const GenerateTableSetDocument = gql`
    mutation generateTableSet($sets: Int!) {
  generateTableSet(sets: $sets)
}
    `;
export type GenerateTableSetMutationFn = Apollo.MutationFunction<GenerateTableSetMutation, GenerateTableSetMutationVariables>;

/**
 * __useGenerateTableSetMutation__
 *
 * To run a mutation, you first call `useGenerateTableSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateTableSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateTableSetMutation, { data, loading, error }] = useGenerateTableSetMutation({
 *   variables: {
 *      sets: // value for 'sets'
 *   },
 * });
 */
export function useGenerateTableSetMutation(baseOptions?: Apollo.MutationHookOptions<GenerateTableSetMutation, GenerateTableSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateTableSetMutation, GenerateTableSetMutationVariables>(GenerateTableSetDocument, options);
      }
export type GenerateTableSetMutationHookResult = ReturnType<typeof useGenerateTableSetMutation>;
export type GenerateTableSetMutationResult = Apollo.MutationResult<GenerateTableSetMutation>;
export type GenerateTableSetMutationOptions = Apollo.BaseMutationOptions<GenerateTableSetMutation, GenerateTableSetMutationVariables>;
export const CreateDeliveryDocument = gql`
    mutation createDelivery($data: DeliveryInput) {
  createDelivery(data: $data)
}
    `;
export type CreateDeliveryMutationFn = Apollo.MutationFunction<CreateDeliveryMutation, CreateDeliveryMutationVariables>;

/**
 * __useCreateDeliveryMutation__
 *
 * To run a mutation, you first call `useCreateDeliveryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDeliveryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDeliveryMutation, { data, loading, error }] = useCreateDeliveryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateDeliveryMutation(baseOptions?: Apollo.MutationHookOptions<CreateDeliveryMutation, CreateDeliveryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDeliveryMutation, CreateDeliveryMutationVariables>(CreateDeliveryDocument, options);
      }
export type CreateDeliveryMutationHookResult = ReturnType<typeof useCreateDeliveryMutation>;
export type CreateDeliveryMutationResult = Apollo.MutationResult<CreateDeliveryMutation>;
export type CreateDeliveryMutationOptions = Apollo.BaseMutationOptions<CreateDeliveryMutation, CreateDeliveryMutationVariables>;
export const UpdateDeliveryDocument = gql`
    mutation updateDelivery($updateDeliveryId: Int!, $data: DeliveryInput) {
  updateDelivery(id: $updateDeliveryId, data: $data)
}
    `;
export type UpdateDeliveryMutationFn = Apollo.MutationFunction<UpdateDeliveryMutation, UpdateDeliveryMutationVariables>;

/**
 * __useUpdateDeliveryMutation__
 *
 * To run a mutation, you first call `useUpdateDeliveryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDeliveryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDeliveryMutation, { data, loading, error }] = useUpdateDeliveryMutation({
 *   variables: {
 *      updateDeliveryId: // value for 'updateDeliveryId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateDeliveryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDeliveryMutation, UpdateDeliveryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDeliveryMutation, UpdateDeliveryMutationVariables>(UpdateDeliveryDocument, options);
      }
export type UpdateDeliveryMutationHookResult = ReturnType<typeof useUpdateDeliveryMutation>;
export type UpdateDeliveryMutationResult = Apollo.MutationResult<UpdateDeliveryMutation>;
export type UpdateDeliveryMutationOptions = Apollo.BaseMutationOptions<UpdateDeliveryMutation, UpdateDeliveryMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($data: UserInput) {
  createUser(data: $data)
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($id: Int!, $data: UserInput) {
  updateUser(id: $id, data: $data)
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreatePositionDocument = gql`
    mutation createPosition($name: String!) {
  createPosition(name: $name)
}
    `;
export type CreatePositionMutationFn = Apollo.MutationFunction<CreatePositionMutation, CreatePositionMutationVariables>;

/**
 * __useCreatePositionMutation__
 *
 * To run a mutation, you first call `useCreatePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPositionMutation, { data, loading, error }] = useCreatePositionMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreatePositionMutation(baseOptions?: Apollo.MutationHookOptions<CreatePositionMutation, CreatePositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePositionMutation, CreatePositionMutationVariables>(CreatePositionDocument, options);
      }
export type CreatePositionMutationHookResult = ReturnType<typeof useCreatePositionMutation>;
export type CreatePositionMutationResult = Apollo.MutationResult<CreatePositionMutation>;
export type CreatePositionMutationOptions = Apollo.BaseMutationOptions<CreatePositionMutation, CreatePositionMutationVariables>;
export const UpdatePositionDocument = gql`
    mutation updatePosition($name: String!, $updatePositionId: Int!) {
  updatePosition(name: $name, id: $updatePositionId)
}
    `;
export type UpdatePositionMutationFn = Apollo.MutationFunction<UpdatePositionMutation, UpdatePositionMutationVariables>;

/**
 * __useUpdatePositionMutation__
 *
 * To run a mutation, you first call `useUpdatePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePositionMutation, { data, loading, error }] = useUpdatePositionMutation({
 *   variables: {
 *      name: // value for 'name'
 *      updatePositionId: // value for 'updatePositionId'
 *   },
 * });
 */
export function useUpdatePositionMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePositionMutation, UpdatePositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePositionMutation, UpdatePositionMutationVariables>(UpdatePositionDocument, options);
      }
export type UpdatePositionMutationHookResult = ReturnType<typeof useUpdatePositionMutation>;
export type UpdatePositionMutationResult = Apollo.MutationResult<UpdatePositionMutation>;
export type UpdatePositionMutationOptions = Apollo.BaseMutationOptions<UpdatePositionMutation, UpdatePositionMutationVariables>;
export const CreateBankDocument = gql`
    mutation createBank($name: String!, $phone: String) {
  createBank(name: $name, phone: $phone)
}
    `;
export type CreateBankMutationFn = Apollo.MutationFunction<CreateBankMutation, CreateBankMutationVariables>;

/**
 * __useCreateBankMutation__
 *
 * To run a mutation, you first call `useCreateBankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBankMutation, { data, loading, error }] = useCreateBankMutation({
 *   variables: {
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useCreateBankMutation(baseOptions?: Apollo.MutationHookOptions<CreateBankMutation, CreateBankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBankMutation, CreateBankMutationVariables>(CreateBankDocument, options);
      }
export type CreateBankMutationHookResult = ReturnType<typeof useCreateBankMutation>;
export type CreateBankMutationResult = Apollo.MutationResult<CreateBankMutation>;
export type CreateBankMutationOptions = Apollo.BaseMutationOptions<CreateBankMutation, CreateBankMutationVariables>;
export const UpdateBankDocument = gql`
    mutation updateBank($updateBankId: Int!, $name: String!, $phone: String) {
  updateBank(id: $updateBankId, name: $name, phone: $phone)
}
    `;
export type UpdateBankMutationFn = Apollo.MutationFunction<UpdateBankMutation, UpdateBankMutationVariables>;

/**
 * __useUpdateBankMutation__
 *
 * To run a mutation, you first call `useUpdateBankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBankMutation, { data, loading, error }] = useUpdateBankMutation({
 *   variables: {
 *      updateBankId: // value for 'updateBankId'
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useUpdateBankMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBankMutation, UpdateBankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBankMutation, UpdateBankMutationVariables>(UpdateBankDocument, options);
      }
export type UpdateBankMutationHookResult = ReturnType<typeof useUpdateBankMutation>;
export type UpdateBankMutationResult = Apollo.MutationResult<UpdateBankMutation>;
export type UpdateBankMutationOptions = Apollo.BaseMutationOptions<UpdateBankMutation, UpdateBankMutationVariables>;
export const CheckAttendanceDocument = gql`
    mutation checkAttendance($userId: Int!, $date: String!) {
  checkAttendance(userId: $userId, date: $date)
}
    `;
export type CheckAttendanceMutationFn = Apollo.MutationFunction<CheckAttendanceMutation, CheckAttendanceMutationVariables>;

/**
 * __useCheckAttendanceMutation__
 *
 * To run a mutation, you first call `useCheckAttendanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckAttendanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkAttendanceMutation, { data, loading, error }] = useCheckAttendanceMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useCheckAttendanceMutation(baseOptions?: Apollo.MutationHookOptions<CheckAttendanceMutation, CheckAttendanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckAttendanceMutation, CheckAttendanceMutationVariables>(CheckAttendanceDocument, options);
      }
export type CheckAttendanceMutationHookResult = ReturnType<typeof useCheckAttendanceMutation>;
export type CheckAttendanceMutationResult = Apollo.MutationResult<CheckAttendanceMutation>;
export type CheckAttendanceMutationOptions = Apollo.BaseMutationOptions<CheckAttendanceMutation, CheckAttendanceMutationVariables>;
export const CreateShiftDocument = gql`
    mutation createShift($data: ShiftInput) {
  createShift(data: $data)
}
    `;
export type CreateShiftMutationFn = Apollo.MutationFunction<CreateShiftMutation, CreateShiftMutationVariables>;

/**
 * __useCreateShiftMutation__
 *
 * To run a mutation, you first call `useCreateShiftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShiftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShiftMutation, { data, loading, error }] = useCreateShiftMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShiftMutation(baseOptions?: Apollo.MutationHookOptions<CreateShiftMutation, CreateShiftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShiftMutation, CreateShiftMutationVariables>(CreateShiftDocument, options);
      }
export type CreateShiftMutationHookResult = ReturnType<typeof useCreateShiftMutation>;
export type CreateShiftMutationResult = Apollo.MutationResult<CreateShiftMutation>;
export type CreateShiftMutationOptions = Apollo.BaseMutationOptions<CreateShiftMutation, CreateShiftMutationVariables>;
export const UpdateShiftDocument = gql`
    mutation updateShift($updateShiftId: Int!, $expected: Boolean, $data: ShiftInput) {
  updateShift(id: $updateShiftId, expected: $expected, data: $data)
}
    `;
export type UpdateShiftMutationFn = Apollo.MutationFunction<UpdateShiftMutation, UpdateShiftMutationVariables>;

/**
 * __useUpdateShiftMutation__
 *
 * To run a mutation, you first call `useUpdateShiftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShiftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShiftMutation, { data, loading, error }] = useUpdateShiftMutation({
 *   variables: {
 *      updateShiftId: // value for 'updateShiftId'
 *      expected: // value for 'expected'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateShiftMutation(baseOptions?: Apollo.MutationHookOptions<UpdateShiftMutation, UpdateShiftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateShiftMutation, UpdateShiftMutationVariables>(UpdateShiftDocument, options);
      }
export type UpdateShiftMutationHookResult = ReturnType<typeof useUpdateShiftMutation>;
export type UpdateShiftMutationResult = Apollo.MutationResult<UpdateShiftMutation>;
export type UpdateShiftMutationOptions = Apollo.BaseMutationOptions<UpdateShiftMutation, UpdateShiftMutationVariables>;
export const PeopleInOrderDocument = gql`
    mutation peopleInOrder($peopleInOrderId: Int!, $count: Int!) {
  peopleInOrder(id: $peopleInOrderId, count: $count)
}
    `;
export type PeopleInOrderMutationFn = Apollo.MutationFunction<PeopleInOrderMutation, PeopleInOrderMutationVariables>;

/**
 * __usePeopleInOrderMutation__
 *
 * To run a mutation, you first call `usePeopleInOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePeopleInOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [peopleInOrderMutation, { data, loading, error }] = usePeopleInOrderMutation({
 *   variables: {
 *      peopleInOrderId: // value for 'peopleInOrderId'
 *      count: // value for 'count'
 *   },
 * });
 */
export function usePeopleInOrderMutation(baseOptions?: Apollo.MutationHookOptions<PeopleInOrderMutation, PeopleInOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PeopleInOrderMutation, PeopleInOrderMutationVariables>(PeopleInOrderDocument, options);
      }
export type PeopleInOrderMutationHookResult = ReturnType<typeof usePeopleInOrderMutation>;
export type PeopleInOrderMutationResult = Apollo.MutationResult<PeopleInOrderMutation>;
export type PeopleInOrderMutationOptions = Apollo.BaseMutationOptions<PeopleInOrderMutation, PeopleInOrderMutationVariables>;
export const CreateLeaveDocument = gql`
    mutation createLeave($userId: Int!, $data: LeaveInput) {
  createLeave(userId: $userId, data: $data)
}
    `;
export type CreateLeaveMutationFn = Apollo.MutationFunction<CreateLeaveMutation, CreateLeaveMutationVariables>;

/**
 * __useCreateLeaveMutation__
 *
 * To run a mutation, you first call `useCreateLeaveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLeaveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLeaveMutation, { data, loading, error }] = useCreateLeaveMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateLeaveMutation(baseOptions?: Apollo.MutationHookOptions<CreateLeaveMutation, CreateLeaveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLeaveMutation, CreateLeaveMutationVariables>(CreateLeaveDocument, options);
      }
export type CreateLeaveMutationHookResult = ReturnType<typeof useCreateLeaveMutation>;
export type CreateLeaveMutationResult = Apollo.MutationResult<CreateLeaveMutation>;
export type CreateLeaveMutationOptions = Apollo.BaseMutationOptions<CreateLeaveMutation, CreateLeaveMutationVariables>;
export const UpdateLeaveDocument = gql`
    mutation updateLeave($updateLeaveId: Int!, $data: LeaveInput) {
  updateLeave(id: $updateLeaveId, data: $data)
}
    `;
export type UpdateLeaveMutationFn = Apollo.MutationFunction<UpdateLeaveMutation, UpdateLeaveMutationVariables>;

/**
 * __useUpdateLeaveMutation__
 *
 * To run a mutation, you first call `useUpdateLeaveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLeaveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLeaveMutation, { data, loading, error }] = useUpdateLeaveMutation({
 *   variables: {
 *      updateLeaveId: // value for 'updateLeaveId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateLeaveMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLeaveMutation, UpdateLeaveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLeaveMutation, UpdateLeaveMutationVariables>(UpdateLeaveDocument, options);
      }
export type UpdateLeaveMutationHookResult = ReturnType<typeof useUpdateLeaveMutation>;
export type UpdateLeaveMutationResult = Apollo.MutationResult<UpdateLeaveMutation>;
export type UpdateLeaveMutationOptions = Apollo.BaseMutationOptions<UpdateLeaveMutation, UpdateLeaveMutationVariables>;
export const UpdateLeaveStatusDocument = gql`
    mutation updateLeaveStatus($updateLeaveStatusId: Int!, $status: LeaveStatus) {
  updateLeaveStatus(id: $updateLeaveStatusId, status: $status)
}
    `;
export type UpdateLeaveStatusMutationFn = Apollo.MutationFunction<UpdateLeaveStatusMutation, UpdateLeaveStatusMutationVariables>;

/**
 * __useUpdateLeaveStatusMutation__
 *
 * To run a mutation, you first call `useUpdateLeaveStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLeaveStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLeaveStatusMutation, { data, loading, error }] = useUpdateLeaveStatusMutation({
 *   variables: {
 *      updateLeaveStatusId: // value for 'updateLeaveStatusId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateLeaveStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLeaveStatusMutation, UpdateLeaveStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLeaveStatusMutation, UpdateLeaveStatusMutationVariables>(UpdateLeaveStatusDocument, options);
      }
export type UpdateLeaveStatusMutationHookResult = ReturnType<typeof useUpdateLeaveStatusMutation>;
export type UpdateLeaveStatusMutationResult = Apollo.MutationResult<UpdateLeaveStatusMutation>;
export type UpdateLeaveStatusMutationOptions = Apollo.BaseMutationOptions<UpdateLeaveStatusMutation, UpdateLeaveStatusMutationVariables>;
export const CreateOverTimeDocument = gql`
    mutation createOverTime($userId: Int!, $data: OverTimeInput) {
  createOverTime(userId: $userId, data: $data)
}
    `;
export type CreateOverTimeMutationFn = Apollo.MutationFunction<CreateOverTimeMutation, CreateOverTimeMutationVariables>;

/**
 * __useCreateOverTimeMutation__
 *
 * To run a mutation, you first call `useCreateOverTimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOverTimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOverTimeMutation, { data, loading, error }] = useCreateOverTimeMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOverTimeMutation(baseOptions?: Apollo.MutationHookOptions<CreateOverTimeMutation, CreateOverTimeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOverTimeMutation, CreateOverTimeMutationVariables>(CreateOverTimeDocument, options);
      }
export type CreateOverTimeMutationHookResult = ReturnType<typeof useCreateOverTimeMutation>;
export type CreateOverTimeMutationResult = Apollo.MutationResult<CreateOverTimeMutation>;
export type CreateOverTimeMutationOptions = Apollo.BaseMutationOptions<CreateOverTimeMutation, CreateOverTimeMutationVariables>;
export const UpdateOverTimeDocument = gql`
    mutation updateOverTime($updateOverTimeId: Int!, $data: OverTimeInput) {
  updateOverTime(id: $updateOverTimeId, data: $data)
}
    `;
export type UpdateOverTimeMutationFn = Apollo.MutationFunction<UpdateOverTimeMutation, UpdateOverTimeMutationVariables>;

/**
 * __useUpdateOverTimeMutation__
 *
 * To run a mutation, you first call `useUpdateOverTimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOverTimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOverTimeMutation, { data, loading, error }] = useUpdateOverTimeMutation({
 *   variables: {
 *      updateOverTimeId: // value for 'updateOverTimeId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOverTimeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOverTimeMutation, UpdateOverTimeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOverTimeMutation, UpdateOverTimeMutationVariables>(UpdateOverTimeDocument, options);
      }
export type UpdateOverTimeMutationHookResult = ReturnType<typeof useUpdateOverTimeMutation>;
export type UpdateOverTimeMutationResult = Apollo.MutationResult<UpdateOverTimeMutation>;
export type UpdateOverTimeMutationOptions = Apollo.BaseMutationOptions<UpdateOverTimeMutation, UpdateOverTimeMutationVariables>;
export const UpdateOverTimeStatusDocument = gql`
    mutation updateOverTimeStatus($updateOverTimeStatusId: Int!, $status: OverTimeStatus) {
  updateOverTimeStatus(id: $updateOverTimeStatusId, status: $status)
}
    `;
export type UpdateOverTimeStatusMutationFn = Apollo.MutationFunction<UpdateOverTimeStatusMutation, UpdateOverTimeStatusMutationVariables>;

/**
 * __useUpdateOverTimeStatusMutation__
 *
 * To run a mutation, you first call `useUpdateOverTimeStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOverTimeStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOverTimeStatusMutation, { data, loading, error }] = useUpdateOverTimeStatusMutation({
 *   variables: {
 *      updateOverTimeStatusId: // value for 'updateOverTimeStatusId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateOverTimeStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOverTimeStatusMutation, UpdateOverTimeStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOverTimeStatusMutation, UpdateOverTimeStatusMutationVariables>(UpdateOverTimeStatusDocument, options);
      }
export type UpdateOverTimeStatusMutationHookResult = ReturnType<typeof useUpdateOverTimeStatusMutation>;
export type UpdateOverTimeStatusMutationResult = Apollo.MutationResult<UpdateOverTimeStatusMutation>;
export type UpdateOverTimeStatusMutationOptions = Apollo.BaseMutationOptions<UpdateOverTimeStatusMutation, UpdateOverTimeStatusMutationVariables>;
export const UpdateStatusProductDocument = gql`
    mutation updateStatusProduct($updateStatusProductId: Int!, $status: STATUS_PRODUCT!) {
  updateStatusProduct(id: $updateStatusProductId, status: $status)
}
    `;
export type UpdateStatusProductMutationFn = Apollo.MutationFunction<UpdateStatusProductMutation, UpdateStatusProductMutationVariables>;

/**
 * __useUpdateStatusProductMutation__
 *
 * To run a mutation, you first call `useUpdateStatusProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStatusProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStatusProductMutation, { data, loading, error }] = useUpdateStatusProductMutation({
 *   variables: {
 *      updateStatusProductId: // value for 'updateStatusProductId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateStatusProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStatusProductMutation, UpdateStatusProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStatusProductMutation, UpdateStatusProductMutationVariables>(UpdateStatusProductDocument, options);
      }
export type UpdateStatusProductMutationHookResult = ReturnType<typeof useUpdateStatusProductMutation>;
export type UpdateStatusProductMutationResult = Apollo.MutationResult<UpdateStatusProductMutation>;
export type UpdateStatusProductMutationOptions = Apollo.BaseMutationOptions<UpdateStatusProductMutation, UpdateStatusProductMutationVariables>;
export const AddDiscountOrderDocument = gql`
    mutation addDiscountOrder($addDiscountOrderId: Int!, $discount: Float!) {
  addDiscountOrder(id: $addDiscountOrderId, discount: $discount)
}
    `;
export type AddDiscountOrderMutationFn = Apollo.MutationFunction<AddDiscountOrderMutation, AddDiscountOrderMutationVariables>;

/**
 * __useAddDiscountOrderMutation__
 *
 * To run a mutation, you first call `useAddDiscountOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDiscountOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDiscountOrderMutation, { data, loading, error }] = useAddDiscountOrderMutation({
 *   variables: {
 *      addDiscountOrderId: // value for 'addDiscountOrderId'
 *      discount: // value for 'discount'
 *   },
 * });
 */
export function useAddDiscountOrderMutation(baseOptions?: Apollo.MutationHookOptions<AddDiscountOrderMutation, AddDiscountOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDiscountOrderMutation, AddDiscountOrderMutationVariables>(AddDiscountOrderDocument, options);
      }
export type AddDiscountOrderMutationHookResult = ReturnType<typeof useAddDiscountOrderMutation>;
export type AddDiscountOrderMutationResult = Apollo.MutationResult<AddDiscountOrderMutation>;
export type AddDiscountOrderMutationOptions = Apollo.BaseMutationOptions<AddDiscountOrderMutation, AddDiscountOrderMutationVariables>;
export const SetTypePaymentOrderDocument = gql`
    mutation setTypePaymentOrder($setTypePaymentOrderId: Int!, $bankType: String, $currency: String, $bankId: Int) {
  setTypePaymentOrder(
    id: $setTypePaymentOrderId
    bankType: $bankType
    currency: $currency
    bankId: $bankId
  )
}
    `;
export type SetTypePaymentOrderMutationFn = Apollo.MutationFunction<SetTypePaymentOrderMutation, SetTypePaymentOrderMutationVariables>;

/**
 * __useSetTypePaymentOrderMutation__
 *
 * To run a mutation, you first call `useSetTypePaymentOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTypePaymentOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTypePaymentOrderMutation, { data, loading, error }] = useSetTypePaymentOrderMutation({
 *   variables: {
 *      setTypePaymentOrderId: // value for 'setTypePaymentOrderId'
 *      bankType: // value for 'bankType'
 *      currency: // value for 'currency'
 *      bankId: // value for 'bankId'
 *   },
 * });
 */
export function useSetTypePaymentOrderMutation(baseOptions?: Apollo.MutationHookOptions<SetTypePaymentOrderMutation, SetTypePaymentOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetTypePaymentOrderMutation, SetTypePaymentOrderMutationVariables>(SetTypePaymentOrderDocument, options);
      }
export type SetTypePaymentOrderMutationHookResult = ReturnType<typeof useSetTypePaymentOrderMutation>;
export type SetTypePaymentOrderMutationResult = Apollo.MutationResult<SetTypePaymentOrderMutation>;
export type SetTypePaymentOrderMutationOptions = Apollo.BaseMutationOptions<SetTypePaymentOrderMutation, SetTypePaymentOrderMutationVariables>;
export const SwapOrderTableDocument = gql`
    mutation swapOrderTable($orderId: Int!, $table: String) {
  swapOrderTable(orderId: $orderId, table: $table)
}
    `;
export type SwapOrderTableMutationFn = Apollo.MutationFunction<SwapOrderTableMutation, SwapOrderTableMutationVariables>;

/**
 * __useSwapOrderTableMutation__
 *
 * To run a mutation, you first call `useSwapOrderTableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSwapOrderTableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [swapOrderTableMutation, { data, loading, error }] = useSwapOrderTableMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      table: // value for 'table'
 *   },
 * });
 */
export function useSwapOrderTableMutation(baseOptions?: Apollo.MutationHookOptions<SwapOrderTableMutation, SwapOrderTableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SwapOrderTableMutation, SwapOrderTableMutationVariables>(SwapOrderTableDocument, options);
      }
export type SwapOrderTableMutationHookResult = ReturnType<typeof useSwapOrderTableMutation>;
export type SwapOrderTableMutationResult = Apollo.MutationResult<SwapOrderTableMutation>;
export type SwapOrderTableMutationOptions = Apollo.BaseMutationOptions<SwapOrderTableMutation, SwapOrderTableMutationVariables>;
export const CheckProductCodeDocument = gql`
    mutation checkProductCode($code: String!) {
  checkProductCode(code: $code)
}
    `;
export type CheckProductCodeMutationFn = Apollo.MutationFunction<CheckProductCodeMutation, CheckProductCodeMutationVariables>;

/**
 * __useCheckProductCodeMutation__
 *
 * To run a mutation, you first call `useCheckProductCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckProductCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkProductCodeMutation, { data, loading, error }] = useCheckProductCodeMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useCheckProductCodeMutation(baseOptions?: Apollo.MutationHookOptions<CheckProductCodeMutation, CheckProductCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckProductCodeMutation, CheckProductCodeMutationVariables>(CheckProductCodeDocument, options);
      }
export type CheckProductCodeMutationHookResult = ReturnType<typeof useCheckProductCodeMutation>;
export type CheckProductCodeMutationResult = Apollo.MutationResult<CheckProductCodeMutation>;
export type CheckProductCodeMutationOptions = Apollo.BaseMutationOptions<CheckProductCodeMutation, CheckProductCodeMutationVariables>;
export const CreateHolidayDocument = gql`
    mutation createHoliday($data: HolidayInput) {
  createHoliday(data: $data)
}
    `;
export type CreateHolidayMutationFn = Apollo.MutationFunction<CreateHolidayMutation, CreateHolidayMutationVariables>;

/**
 * __useCreateHolidayMutation__
 *
 * To run a mutation, you first call `useCreateHolidayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHolidayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHolidayMutation, { data, loading, error }] = useCreateHolidayMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateHolidayMutation(baseOptions?: Apollo.MutationHookOptions<CreateHolidayMutation, CreateHolidayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHolidayMutation, CreateHolidayMutationVariables>(CreateHolidayDocument, options);
      }
export type CreateHolidayMutationHookResult = ReturnType<typeof useCreateHolidayMutation>;
export type CreateHolidayMutationResult = Apollo.MutationResult<CreateHolidayMutation>;
export type CreateHolidayMutationOptions = Apollo.BaseMutationOptions<CreateHolidayMutation, CreateHolidayMutationVariables>;
export const UpdateHolidayDocument = gql`
    mutation updateHoliday($updateHolidayId: Int!, $data: HolidayInput) {
  updateHoliday(id: $updateHolidayId, data: $data)
}
    `;
export type UpdateHolidayMutationFn = Apollo.MutationFunction<UpdateHolidayMutation, UpdateHolidayMutationVariables>;

/**
 * __useUpdateHolidayMutation__
 *
 * To run a mutation, you first call `useUpdateHolidayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHolidayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHolidayMutation, { data, loading, error }] = useUpdateHolidayMutation({
 *   variables: {
 *      updateHolidayId: // value for 'updateHolidayId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateHolidayMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHolidayMutation, UpdateHolidayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHolidayMutation, UpdateHolidayMutationVariables>(UpdateHolidayDocument, options);
      }
export type UpdateHolidayMutationHookResult = ReturnType<typeof useUpdateHolidayMutation>;
export type UpdateHolidayMutationResult = Apollo.MutationResult<UpdateHolidayMutation>;
export type UpdateHolidayMutationOptions = Apollo.BaseMutationOptions<UpdateHolidayMutation, UpdateHolidayMutationVariables>;
export const CreateOrderScheduleDocument = gql`
    mutation createOrderSchedule($data: OrderScheduleInput) {
  createOrderSchedule(data: $data)
}
    `;
export type CreateOrderScheduleMutationFn = Apollo.MutationFunction<CreateOrderScheduleMutation, CreateOrderScheduleMutationVariables>;

/**
 * __useCreateOrderScheduleMutation__
 *
 * To run a mutation, you first call `useCreateOrderScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderScheduleMutation, { data, loading, error }] = useCreateOrderScheduleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOrderScheduleMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderScheduleMutation, CreateOrderScheduleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderScheduleMutation, CreateOrderScheduleMutationVariables>(CreateOrderScheduleDocument, options);
      }
export type CreateOrderScheduleMutationHookResult = ReturnType<typeof useCreateOrderScheduleMutation>;
export type CreateOrderScheduleMutationResult = Apollo.MutationResult<CreateOrderScheduleMutation>;
export type CreateOrderScheduleMutationOptions = Apollo.BaseMutationOptions<CreateOrderScheduleMutation, CreateOrderScheduleMutationVariables>;
export const UpdateOrderScheduleDocument = gql`
    mutation updateOrderSchedule($updateOrderScheduleId: Int!, $data: OrderScheduleInput) {
  updateOrderSchedule(id: $updateOrderScheduleId, data: $data)
}
    `;
export type UpdateOrderScheduleMutationFn = Apollo.MutationFunction<UpdateOrderScheduleMutation, UpdateOrderScheduleMutationVariables>;

/**
 * __useUpdateOrderScheduleMutation__
 *
 * To run a mutation, you first call `useUpdateOrderScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderScheduleMutation, { data, loading, error }] = useUpdateOrderScheduleMutation({
 *   variables: {
 *      updateOrderScheduleId: // value for 'updateOrderScheduleId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOrderScheduleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderScheduleMutation, UpdateOrderScheduleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrderScheduleMutation, UpdateOrderScheduleMutationVariables>(UpdateOrderScheduleDocument, options);
      }
export type UpdateOrderScheduleMutationHookResult = ReturnType<typeof useUpdateOrderScheduleMutation>;
export type UpdateOrderScheduleMutationResult = Apollo.MutationResult<UpdateOrderScheduleMutation>;
export type UpdateOrderScheduleMutationOptions = Apollo.BaseMutationOptions<UpdateOrderScheduleMutation, UpdateOrderScheduleMutationVariables>;
export const DeleteOrderScheduleDocument = gql`
    mutation deleteOrderSchedule($deleteOrderScheduleId: Int!) {
  deleteOrderSchedule(id: $deleteOrderScheduleId)
}
    `;
export type DeleteOrderScheduleMutationFn = Apollo.MutationFunction<DeleteOrderScheduleMutation, DeleteOrderScheduleMutationVariables>;

/**
 * __useDeleteOrderScheduleMutation__
 *
 * To run a mutation, you first call `useDeleteOrderScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrderScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrderScheduleMutation, { data, loading, error }] = useDeleteOrderScheduleMutation({
 *   variables: {
 *      deleteOrderScheduleId: // value for 'deleteOrderScheduleId'
 *   },
 * });
 */
export function useDeleteOrderScheduleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOrderScheduleMutation, DeleteOrderScheduleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOrderScheduleMutation, DeleteOrderScheduleMutationVariables>(DeleteOrderScheduleDocument, options);
      }
export type DeleteOrderScheduleMutationHookResult = ReturnType<typeof useDeleteOrderScheduleMutation>;
export type DeleteOrderScheduleMutationResult = Apollo.MutationResult<DeleteOrderScheduleMutation>;
export type DeleteOrderScheduleMutationOptions = Apollo.BaseMutationOptions<DeleteOrderScheduleMutation, DeleteOrderScheduleMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($username: String!, $oldPassowrd: String!, $password: String!) {
  resetPassword(
    username: $username
    oldPassowrd: $oldPassowrd
    password: $password
  )
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      username: // value for 'username'
 *      oldPassowrd: // value for 'oldPassowrd'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SetItemShowOnDocument = gql`
    mutation setItemShowOn($productId: Int!, $skuId: Int, $status: String) {
  setItemShowOn(productId: $productId, skuId: $skuId, status: $status)
}
    `;
export type SetItemShowOnMutationFn = Apollo.MutationFunction<SetItemShowOnMutation, SetItemShowOnMutationVariables>;

/**
 * __useSetItemShowOnMutation__
 *
 * To run a mutation, you first call `useSetItemShowOnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetItemShowOnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setItemShowOnMutation, { data, loading, error }] = useSetItemShowOnMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      skuId: // value for 'skuId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useSetItemShowOnMutation(baseOptions?: Apollo.MutationHookOptions<SetItemShowOnMutation, SetItemShowOnMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetItemShowOnMutation, SetItemShowOnMutationVariables>(SetItemShowOnDocument, options);
      }
export type SetItemShowOnMutationHookResult = ReturnType<typeof useSetItemShowOnMutation>;
export type SetItemShowOnMutationResult = Apollo.MutationResult<SetItemShowOnMutation>;
export type SetItemShowOnMutationOptions = Apollo.BaseMutationOptions<SetItemShowOnMutation, SetItemShowOnMutationVariables>;
export const MarkFirstPrintOrderDocument = gql`
    mutation markFirstPrintOrder($orderId: Int!) {
  markFirstPrintOrder(orderId: $orderId)
}
    `;
export type MarkFirstPrintOrderMutationFn = Apollo.MutationFunction<MarkFirstPrintOrderMutation, MarkFirstPrintOrderMutationVariables>;

/**
 * __useMarkFirstPrintOrderMutation__
 *
 * To run a mutation, you first call `useMarkFirstPrintOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkFirstPrintOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markFirstPrintOrderMutation, { data, loading, error }] = useMarkFirstPrintOrderMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useMarkFirstPrintOrderMutation(baseOptions?: Apollo.MutationHookOptions<MarkFirstPrintOrderMutation, MarkFirstPrintOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkFirstPrintOrderMutation, MarkFirstPrintOrderMutationVariables>(MarkFirstPrintOrderDocument, options);
      }
export type MarkFirstPrintOrderMutationHookResult = ReturnType<typeof useMarkFirstPrintOrderMutation>;
export type MarkFirstPrintOrderMutationResult = Apollo.MutationResult<MarkFirstPrintOrderMutation>;
export type MarkFirstPrintOrderMutationOptions = Apollo.BaseMutationOptions<MarkFirstPrintOrderMutation, MarkFirstPrintOrderMutationVariables>;
export const CreateTransactionStockDocument = gql`
    mutation createTransactionStock($data: [TransactionStockInput]) {
  createTransactionStock(data: $data)
}
    `;
export type CreateTransactionStockMutationFn = Apollo.MutationFunction<CreateTransactionStockMutation, CreateTransactionStockMutationVariables>;

/**
 * __useCreateTransactionStockMutation__
 *
 * To run a mutation, you first call `useCreateTransactionStockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTransactionStockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTransactionStockMutation, { data, loading, error }] = useCreateTransactionStockMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTransactionStockMutation(baseOptions?: Apollo.MutationHookOptions<CreateTransactionStockMutation, CreateTransactionStockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTransactionStockMutation, CreateTransactionStockMutationVariables>(CreateTransactionStockDocument, options);
      }
export type CreateTransactionStockMutationHookResult = ReturnType<typeof useCreateTransactionStockMutation>;
export type CreateTransactionStockMutationResult = Apollo.MutationResult<CreateTransactionStockMutation>;
export type CreateTransactionStockMutationOptions = Apollo.BaseMutationOptions<CreateTransactionStockMutation, CreateTransactionStockMutationVariables>;
export const MergeOrderDocument = gql`
    mutation mergeOrder($fromOrderId: [Int!], $toOrderId: Int) {
  mergeOrder(fromOrderId: $fromOrderId, toOrderId: $toOrderId)
}
    `;
export type MergeOrderMutationFn = Apollo.MutationFunction<MergeOrderMutation, MergeOrderMutationVariables>;

/**
 * __useMergeOrderMutation__
 *
 * To run a mutation, you first call `useMergeOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMergeOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mergeOrderMutation, { data, loading, error }] = useMergeOrderMutation({
 *   variables: {
 *      fromOrderId: // value for 'fromOrderId'
 *      toOrderId: // value for 'toOrderId'
 *   },
 * });
 */
export function useMergeOrderMutation(baseOptions?: Apollo.MutationHookOptions<MergeOrderMutation, MergeOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MergeOrderMutation, MergeOrderMutationVariables>(MergeOrderDocument, options);
      }
export type MergeOrderMutationHookResult = ReturnType<typeof useMergeOrderMutation>;
export type MergeOrderMutationResult = Apollo.MutationResult<MergeOrderMutation>;
export type MergeOrderMutationOptions = Apollo.BaseMutationOptions<MergeOrderMutation, MergeOrderMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    display
    contact
    gender
    role {
      name
      id
    }
    createdDate
    isActive
    ownerId
    startingAt
    bankName
    bankAcc
    bankType
    position
    baseSalary
    type
    profile
    username
    fromTime
    toTime
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ProductListDocument = gql`
    query ProductList($offset: Int, $limit: Int, $code: String, $filter: FilterProduct, $schedule: Boolean, $enabledOn: [String]) {
  productList(
    offset: $offset
    limit: $limit
    code: $code
    filter: $filter
    schedule: $schedule
    enabledOn: $enabledOn
  ) {
    id
    title
    description
    type
    category {
      id
      name
      root
    }
    sku {
      id
      name
      price
      discount
      unit
      image
      status
      enabledOn
    }
    code
    images
    status
    addons {
      value
      name
      isRequired
      id
    }
  }
}
    `;

/**
 * __useProductListQuery__
 *
 * To run a query within a React component, call `useProductListQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductListQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      code: // value for 'code'
 *      filter: // value for 'filter'
 *      schedule: // value for 'schedule'
 *      enabledOn: // value for 'enabledOn'
 *   },
 * });
 */
export function useProductListQuery(baseOptions?: Apollo.QueryHookOptions<ProductListQuery, ProductListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductListQuery, ProductListQueryVariables>(ProductListDocument, options);
      }
export function useProductListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductListQuery, ProductListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductListQuery, ProductListQueryVariables>(ProductListDocument, options);
        }
export function useProductListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProductListQuery, ProductListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductListQuery, ProductListQueryVariables>(ProductListDocument, options);
        }
export type ProductListQueryHookResult = ReturnType<typeof useProductListQuery>;
export type ProductListLazyQueryHookResult = ReturnType<typeof useProductListLazyQuery>;
export type ProductListSuspenseQueryHookResult = ReturnType<typeof useProductListSuspenseQuery>;
export type ProductListQueryResult = Apollo.QueryResult<ProductListQuery, ProductListQueryVariables>;
export const ProductDocument = gql`
    query product($productId: Int!) {
  product(id: $productId) {
    id
    title
    description
    type
    status
    stockAlter
    category {
      id
      name
      root
    }
    sku {
      id
      name
      price
      discount
      unit
      image
      status
      enabledOn
    }
    code
    images
    integrates {
      qty
      product {
        title
        images
        id
      }
      integrate {
        id
        images
        title
      }
      id
    }
    addons {
      value
      name
      isRequired
      id
    }
  }
}
    `;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables> & ({ variables: ProductQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export function useProductSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductSuspenseQueryHookResult = ReturnType<typeof useProductSuspenseQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const CategoryListDocument = gql`
    query categoryList {
  categoryList
}
    `;

/**
 * __useCategoryListQuery__
 *
 * To run a query within a React component, call `useCategoryListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryListQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoryListQuery(baseOptions?: Apollo.QueryHookOptions<CategoryListQuery, CategoryListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryListQuery, CategoryListQueryVariables>(CategoryListDocument, options);
      }
export function useCategoryListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryListQuery, CategoryListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryListQuery, CategoryListQueryVariables>(CategoryListDocument, options);
        }
export function useCategoryListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CategoryListQuery, CategoryListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoryListQuery, CategoryListQueryVariables>(CategoryListDocument, options);
        }
export type CategoryListQueryHookResult = ReturnType<typeof useCategoryListQuery>;
export type CategoryListLazyQueryHookResult = ReturnType<typeof useCategoryListLazyQuery>;
export type CategoryListSuspenseQueryHookResult = ReturnType<typeof useCategoryListSuspenseQuery>;
export type CategoryListQueryResult = Apollo.QueryResult<CategoryListQuery, CategoryListQueryVariables>;
export const CategoryDocument = gql`
    query category($categoryId: Int!) {
  category(id: $categoryId) {
    id
    name
    root
  }
}
    `;

/**
 * __useCategoryQuery__
 *
 * To run a query within a React component, call `useCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useCategoryQuery(baseOptions: Apollo.QueryHookOptions<CategoryQuery, CategoryQueryVariables> & ({ variables: CategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
      }
export function useCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
        }
export function useCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
        }
export type CategoryQueryHookResult = ReturnType<typeof useCategoryQuery>;
export type CategoryLazyQueryHookResult = ReturnType<typeof useCategoryLazyQuery>;
export type CategorySuspenseQueryHookResult = ReturnType<typeof useCategorySuspenseQuery>;
export type CategoryQueryResult = Apollo.QueryResult<CategoryQuery, CategoryQueryVariables>;
export const OrderListDocument = gql`
    query orderList($offset: Int, $limit: Int, $viewBy: OrderViewBy, $status: [StatusOrder], $orderId: String, $sign: Boolean, $discount: Boolean, $toDate: String, $fromDate: String) {
  orderList(
    offset: $offset
    limit: $limit
    viewBy: $viewBy
    status: $status
    orderId: $orderId
    sign: $sign
    discount: $discount
    toDate: $toDate
    fromDate: $fromDate
  ) {
    id
    code
    deliveryCode
    discount
    delivery {
      id
      name
      contact
    }
    items {
      id
      price
      product {
        id
        images
        title
        code
      }
      qty
      discount
      addons
      remark
      sku {
        name
        image
      }
      status
      createdDate
    }
    status
    name
    paid
    set
    bankId
    currency
    total
    uuid
    note
    vat
    bankType
    invoice
    person
    log {
      date
      text
      by {
        id
        display
      }
    }
  }
}
    `;

/**
 * __useOrderListQuery__
 *
 * To run a query within a React component, call `useOrderListQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderListQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      viewBy: // value for 'viewBy'
 *      status: // value for 'status'
 *      orderId: // value for 'orderId'
 *      sign: // value for 'sign'
 *      discount: // value for 'discount'
 *      toDate: // value for 'toDate'
 *      fromDate: // value for 'fromDate'
 *   },
 * });
 */
export function useOrderListQuery(baseOptions?: Apollo.QueryHookOptions<OrderListQuery, OrderListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderListQuery, OrderListQueryVariables>(OrderListDocument, options);
      }
export function useOrderListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderListQuery, OrderListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderListQuery, OrderListQueryVariables>(OrderListDocument, options);
        }
export function useOrderListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrderListQuery, OrderListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrderListQuery, OrderListQueryVariables>(OrderListDocument, options);
        }
export type OrderListQueryHookResult = ReturnType<typeof useOrderListQuery>;
export type OrderListLazyQueryHookResult = ReturnType<typeof useOrderListLazyQuery>;
export type OrderListSuspenseQueryHookResult = ReturnType<typeof useOrderListSuspenseQuery>;
export type OrderListQueryResult = Apollo.QueryResult<OrderListQuery, OrderListQueryVariables>;
export const OrderDocument = gql`
    query order($token: String, $orderId: Int) {
  order(token: $token, id: $orderId) {
    id
    address
    status
    bankId
    customerPaid
    name
    paid
    set
    total
    uuid
    note
    code
    discount
    vat
    person
    currency
    invoice
    bankType
    firstPrint
    log {
      date
      text
      by {
        id
        display
      }
    }
    deliveryCode
    delivery {
      id
      name
      contact
    }
    items {
      createdDate
      id
      qty
      sku {
        price
        discount
        id
        unit
        name
        image
      }
      product {
        title
        images
        code
        description
        id
      }
      price
      discount
      status
      addons
      remark
      isPrint
    }
  }
}
    `;

/**
 * __useOrderQuery__
 *
 * To run a query within a React component, call `useOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderQuery({
 *   variables: {
 *      token: // value for 'token'
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useOrderQuery(baseOptions?: Apollo.QueryHookOptions<OrderQuery, OrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderQuery, OrderQueryVariables>(OrderDocument, options);
      }
export function useOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderQuery, OrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderQuery, OrderQueryVariables>(OrderDocument, options);
        }
export function useOrderSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrderQuery, OrderQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrderQuery, OrderQueryVariables>(OrderDocument, options);
        }
export type OrderQueryHookResult = ReturnType<typeof useOrderQuery>;
export type OrderLazyQueryHookResult = ReturnType<typeof useOrderLazyQuery>;
export type OrderSuspenseQueryHookResult = ReturnType<typeof useOrderSuspenseQuery>;
export type OrderQueryResult = Apollo.QueryResult<OrderQuery, OrderQueryVariables>;
export const SettingListDocument = gql`
    query settingList {
  settingList {
    value
    type
    option
  }
}
    `;

/**
 * __useSettingListQuery__
 *
 * To run a query within a React component, call `useSettingListQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingListQuery({
 *   variables: {
 *   },
 * });
 */
export function useSettingListQuery(baseOptions?: Apollo.QueryHookOptions<SettingListQuery, SettingListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SettingListQuery, SettingListQueryVariables>(SettingListDocument, options);
      }
export function useSettingListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingListQuery, SettingListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SettingListQuery, SettingListQueryVariables>(SettingListDocument, options);
        }
export function useSettingListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SettingListQuery, SettingListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SettingListQuery, SettingListQueryVariables>(SettingListDocument, options);
        }
export type SettingListQueryHookResult = ReturnType<typeof useSettingListQuery>;
export type SettingListLazyQueryHookResult = ReturnType<typeof useSettingListLazyQuery>;
export type SettingListSuspenseQueryHookResult = ReturnType<typeof useSettingListSuspenseQuery>;
export type SettingListQueryResult = Apollo.QueryResult<SettingListQuery, SettingListQueryVariables>;
export const DeliveryListDocument = gql`
    query deliveryList($offset: Int, $limit: Int) {
  deliveryList(offset: $offset, limit: $limit) {
    contact
    id
    name
  }
}
    `;

/**
 * __useDeliveryListQuery__
 *
 * To run a query within a React component, call `useDeliveryListQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeliveryListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeliveryListQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useDeliveryListQuery(baseOptions?: Apollo.QueryHookOptions<DeliveryListQuery, DeliveryListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DeliveryListQuery, DeliveryListQueryVariables>(DeliveryListDocument, options);
      }
export function useDeliveryListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeliveryListQuery, DeliveryListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DeliveryListQuery, DeliveryListQueryVariables>(DeliveryListDocument, options);
        }
export function useDeliveryListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DeliveryListQuery, DeliveryListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DeliveryListQuery, DeliveryListQueryVariables>(DeliveryListDocument, options);
        }
export type DeliveryListQueryHookResult = ReturnType<typeof useDeliveryListQuery>;
export type DeliveryListLazyQueryHookResult = ReturnType<typeof useDeliveryListLazyQuery>;
export type DeliveryListSuspenseQueryHookResult = ReturnType<typeof useDeliveryListSuspenseQuery>;
export type DeliveryListQueryResult = Apollo.QueryResult<DeliveryListQuery, DeliveryListQueryVariables>;
export const TableSetListDocument = gql`
    query tableSetList($limit: Int, $offset: Int) {
  tableSetList(limit: $limit, offset: $offset) {
    set
    fake
    order {
      id
      uuid
      status
      code
      firstPrint
      items {
        id
        status
        product {
          id
          title
          images
        }
        sku {
          id
          name
          image
        }
        isPrint
        qty
        price
        discount
      }
    }
  }
}
    `;

/**
 * __useTableSetListQuery__
 *
 * To run a query within a React component, call `useTableSetListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTableSetListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTableSetListQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useTableSetListQuery(baseOptions?: Apollo.QueryHookOptions<TableSetListQuery, TableSetListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TableSetListQuery, TableSetListQueryVariables>(TableSetListDocument, options);
      }
export function useTableSetListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TableSetListQuery, TableSetListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TableSetListQuery, TableSetListQueryVariables>(TableSetListDocument, options);
        }
export function useTableSetListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TableSetListQuery, TableSetListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TableSetListQuery, TableSetListQueryVariables>(TableSetListDocument, options);
        }
export type TableSetListQueryHookResult = ReturnType<typeof useTableSetListQuery>;
export type TableSetListLazyQueryHookResult = ReturnType<typeof useTableSetListLazyQuery>;
export type TableSetListSuspenseQueryHookResult = ReturnType<typeof useTableSetListSuspenseQuery>;
export type TableSetListQueryResult = Apollo.QueryResult<TableSetListQuery, TableSetListQueryVariables>;
export const DeliveryByIdDocument = gql`
    query deliveryById($deliveryByIdId: Int!) {
  deliveryById(id: $deliveryByIdId) {
    contact
    id
    name
  }
}
    `;

/**
 * __useDeliveryByIdQuery__
 *
 * To run a query within a React component, call `useDeliveryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeliveryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeliveryByIdQuery({
 *   variables: {
 *      deliveryByIdId: // value for 'deliveryByIdId'
 *   },
 * });
 */
export function useDeliveryByIdQuery(baseOptions: Apollo.QueryHookOptions<DeliveryByIdQuery, DeliveryByIdQueryVariables> & ({ variables: DeliveryByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DeliveryByIdQuery, DeliveryByIdQueryVariables>(DeliveryByIdDocument, options);
      }
export function useDeliveryByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeliveryByIdQuery, DeliveryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DeliveryByIdQuery, DeliveryByIdQueryVariables>(DeliveryByIdDocument, options);
        }
export function useDeliveryByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DeliveryByIdQuery, DeliveryByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DeliveryByIdQuery, DeliveryByIdQueryVariables>(DeliveryByIdDocument, options);
        }
export type DeliveryByIdQueryHookResult = ReturnType<typeof useDeliveryByIdQuery>;
export type DeliveryByIdLazyQueryHookResult = ReturnType<typeof useDeliveryByIdLazyQuery>;
export type DeliveryByIdSuspenseQueryHookResult = ReturnType<typeof useDeliveryByIdSuspenseQuery>;
export type DeliveryByIdQueryResult = Apollo.QueryResult<DeliveryByIdQuery, DeliveryByIdQueryVariables>;
export const GetPositionListDocument = gql`
    query getPositionList($offset: Int = 0, $limit: Int = 30) {
  getPositionList(offset: $offset, limit: $limit) {
    createdDate
    id
    name
    updatedDate
  }
}
    `;

/**
 * __useGetPositionListQuery__
 *
 * To run a query within a React component, call `useGetPositionListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPositionListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPositionListQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetPositionListQuery(baseOptions?: Apollo.QueryHookOptions<GetPositionListQuery, GetPositionListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPositionListQuery, GetPositionListQueryVariables>(GetPositionListDocument, options);
      }
export function useGetPositionListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPositionListQuery, GetPositionListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPositionListQuery, GetPositionListQueryVariables>(GetPositionListDocument, options);
        }
export function useGetPositionListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPositionListQuery, GetPositionListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPositionListQuery, GetPositionListQueryVariables>(GetPositionListDocument, options);
        }
export type GetPositionListQueryHookResult = ReturnType<typeof useGetPositionListQuery>;
export type GetPositionListLazyQueryHookResult = ReturnType<typeof useGetPositionListLazyQuery>;
export type GetPositionListSuspenseQueryHookResult = ReturnType<typeof useGetPositionListSuspenseQuery>;
export type GetPositionListQueryResult = Apollo.QueryResult<GetPositionListQuery, GetPositionListQueryVariables>;
export const PositionDocument = gql`
    query position($positionId: Int!) {
  position(id: $positionId) {
    createdDate
    id
    name
    updatedDate
  }
}
    `;

/**
 * __usePositionQuery__
 *
 * To run a query within a React component, call `usePositionQuery` and pass it any options that fit your needs.
 * When your component renders, `usePositionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePositionQuery({
 *   variables: {
 *      positionId: // value for 'positionId'
 *   },
 * });
 */
export function usePositionQuery(baseOptions: Apollo.QueryHookOptions<PositionQuery, PositionQueryVariables> & ({ variables: PositionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PositionQuery, PositionQueryVariables>(PositionDocument, options);
      }
export function usePositionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PositionQuery, PositionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PositionQuery, PositionQueryVariables>(PositionDocument, options);
        }
export function usePositionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PositionQuery, PositionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PositionQuery, PositionQueryVariables>(PositionDocument, options);
        }
export type PositionQueryHookResult = ReturnType<typeof usePositionQuery>;
export type PositionLazyQueryHookResult = ReturnType<typeof usePositionLazyQuery>;
export type PositionSuspenseQueryHookResult = ReturnType<typeof usePositionSuspenseQuery>;
export type PositionQueryResult = Apollo.QueryResult<PositionQuery, PositionQueryVariables>;
export const BankInfoDocument = gql`
    query bankInfo($bankInfoId: Int!) {
  bankInfo(id: $bankInfoId) {
    createdDate
    id
    name
    phone
    updatedDate
  }
}
    `;

/**
 * __useBankInfoQuery__
 *
 * To run a query within a React component, call `useBankInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useBankInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBankInfoQuery({
 *   variables: {
 *      bankInfoId: // value for 'bankInfoId'
 *   },
 * });
 */
export function useBankInfoQuery(baseOptions: Apollo.QueryHookOptions<BankInfoQuery, BankInfoQueryVariables> & ({ variables: BankInfoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BankInfoQuery, BankInfoQueryVariables>(BankInfoDocument, options);
      }
export function useBankInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BankInfoQuery, BankInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BankInfoQuery, BankInfoQueryVariables>(BankInfoDocument, options);
        }
export function useBankInfoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BankInfoQuery, BankInfoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BankInfoQuery, BankInfoQueryVariables>(BankInfoDocument, options);
        }
export type BankInfoQueryHookResult = ReturnType<typeof useBankInfoQuery>;
export type BankInfoLazyQueryHookResult = ReturnType<typeof useBankInfoLazyQuery>;
export type BankInfoSuspenseQueryHookResult = ReturnType<typeof useBankInfoSuspenseQuery>;
export type BankInfoQueryResult = Apollo.QueryResult<BankInfoQuery, BankInfoQueryVariables>;
export const GetbankListDocument = gql`
    query getbankList($offset: Int = 0, $limit: Int = 30) {
  getbankList(offset: $offset, limit: $limit) {
    createdDate
    id
    name
    phone
    updatedDate
  }
}
    `;

/**
 * __useGetbankListQuery__
 *
 * To run a query within a React component, call `useGetbankListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetbankListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetbankListQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetbankListQuery(baseOptions?: Apollo.QueryHookOptions<GetbankListQuery, GetbankListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetbankListQuery, GetbankListQueryVariables>(GetbankListDocument, options);
      }
export function useGetbankListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetbankListQuery, GetbankListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetbankListQuery, GetbankListQueryVariables>(GetbankListDocument, options);
        }
export function useGetbankListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetbankListQuery, GetbankListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetbankListQuery, GetbankListQueryVariables>(GetbankListDocument, options);
        }
export type GetbankListQueryHookResult = ReturnType<typeof useGetbankListQuery>;
export type GetbankListLazyQueryHookResult = ReturnType<typeof useGetbankListLazyQuery>;
export type GetbankListSuspenseQueryHookResult = ReturnType<typeof useGetbankListSuspenseQuery>;
export type GetbankListQueryResult = Apollo.QueryResult<GetbankListQuery, GetbankListQueryVariables>;
export const UserDocument = gql`
    query user($userId: Int!) {
  user(id: $userId) {
    id
    display
    gender
    dob
    contact
    ownerId
    position
    role {
      id
      name
    }
    startingAt
    type
    username
    password
    profile
    baseSalary
    createdDate
    bankType
    bankName
    bankAcc
    isActive
    fromTime
    toTime
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables> & ({ variables: UserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserListDocument = gql`
    query userList($offset: Int, $limit: Int, $roles: [Int]) {
  userList(offset: $offset, limit: $limit, roles: $roles) {
    id
    display
    gender
    dob
    contact
    ownerId
    position
    role {
      id
      name
    }
    startingAt
    type
    username
    password
    profile
    baseSalary
    createdDate
    bankType
    bankName
    bankAcc
    isActive
    fromTime
    toTime
  }
}
    `;

/**
 * __useUserListQuery__
 *
 * To run a query within a React component, call `useUserListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserListQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      roles: // value for 'roles'
 *   },
 * });
 */
export function useUserListQuery(baseOptions?: Apollo.QueryHookOptions<UserListQuery, UserListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserListQuery, UserListQueryVariables>(UserListDocument, options);
      }
export function useUserListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserListQuery, UserListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserListQuery, UserListQueryVariables>(UserListDocument, options);
        }
export function useUserListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserListQuery, UserListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserListQuery, UserListQueryVariables>(UserListDocument, options);
        }
export type UserListQueryHookResult = ReturnType<typeof useUserListQuery>;
export type UserListLazyQueryHookResult = ReturnType<typeof useUserListLazyQuery>;
export type UserListSuspenseQueryHookResult = ReturnType<typeof useUserListSuspenseQuery>;
export type UserListQueryResult = Apollo.QueryResult<UserListQuery, UserListQueryVariables>;
export const RoleListDocument = gql`
    query roleList {
  roleList {
    id
    name
  }
}
    `;

/**
 * __useRoleListQuery__
 *
 * To run a query within a React component, call `useRoleListQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoleListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoleListQuery({
 *   variables: {
 *   },
 * });
 */
export function useRoleListQuery(baseOptions?: Apollo.QueryHookOptions<RoleListQuery, RoleListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoleListQuery, RoleListQueryVariables>(RoleListDocument, options);
      }
export function useRoleListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoleListQuery, RoleListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoleListQuery, RoleListQueryVariables>(RoleListDocument, options);
        }
export function useRoleListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RoleListQuery, RoleListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RoleListQuery, RoleListQueryVariables>(RoleListDocument, options);
        }
export type RoleListQueryHookResult = ReturnType<typeof useRoleListQuery>;
export type RoleListLazyQueryHookResult = ReturnType<typeof useRoleListLazyQuery>;
export type RoleListSuspenseQueryHookResult = ReturnType<typeof useRoleListSuspenseQuery>;
export type RoleListQueryResult = Apollo.QueryResult<RoleListQuery, RoleListQueryVariables>;
export const GetAttendanceStaffTodayDocument = gql`
    query getAttendanceStaffToday($date: String!) {
  getAttendanceStaffToday(date: $date) {
    user {
      id
      display
    }
    id
    checkIn
    checkOut
    overTimeIn
    overTimeOut
    checkDate
  }
}
    `;

/**
 * __useGetAttendanceStaffTodayQuery__
 *
 * To run a query within a React component, call `useGetAttendanceStaffTodayQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttendanceStaffTodayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttendanceStaffTodayQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useGetAttendanceStaffTodayQuery(baseOptions: Apollo.QueryHookOptions<GetAttendanceStaffTodayQuery, GetAttendanceStaffTodayQueryVariables> & ({ variables: GetAttendanceStaffTodayQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAttendanceStaffTodayQuery, GetAttendanceStaffTodayQueryVariables>(GetAttendanceStaffTodayDocument, options);
      }
export function useGetAttendanceStaffTodayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAttendanceStaffTodayQuery, GetAttendanceStaffTodayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAttendanceStaffTodayQuery, GetAttendanceStaffTodayQueryVariables>(GetAttendanceStaffTodayDocument, options);
        }
export function useGetAttendanceStaffTodaySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAttendanceStaffTodayQuery, GetAttendanceStaffTodayQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAttendanceStaffTodayQuery, GetAttendanceStaffTodayQueryVariables>(GetAttendanceStaffTodayDocument, options);
        }
export type GetAttendanceStaffTodayQueryHookResult = ReturnType<typeof useGetAttendanceStaffTodayQuery>;
export type GetAttendanceStaffTodayLazyQueryHookResult = ReturnType<typeof useGetAttendanceStaffTodayLazyQuery>;
export type GetAttendanceStaffTodaySuspenseQueryHookResult = ReturnType<typeof useGetAttendanceStaffTodaySuspenseQuery>;
export type GetAttendanceStaffTodayQueryResult = Apollo.QueryResult<GetAttendanceStaffTodayQuery, GetAttendanceStaffTodayQueryVariables>;
export const GetAttendanceStaffDocument = gql`
    query getAttendanceStaff($limit: Int, $offset: Int, $from: String, $to: String) {
  getAttendanceStaff(limit: $limit, offset: $offset, from: $from, to: $to) {
    id
    user {
      id
      display
    }
    checkIn
    checkOut
    overTimeIn
    overTimeOut
    checkDate
    leave {
      id
      startDate
      endDate
      leaveReason
      leaveType
      approvedBy {
        id
        display
      }
      approvedDate
    }
    type
    overTimeOut
    overTimeIn
  }
}
    `;

/**
 * __useGetAttendanceStaffQuery__
 *
 * To run a query within a React component, call `useGetAttendanceStaffQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttendanceStaffQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttendanceStaffQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useGetAttendanceStaffQuery(baseOptions?: Apollo.QueryHookOptions<GetAttendanceStaffQuery, GetAttendanceStaffQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAttendanceStaffQuery, GetAttendanceStaffQueryVariables>(GetAttendanceStaffDocument, options);
      }
export function useGetAttendanceStaffLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAttendanceStaffQuery, GetAttendanceStaffQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAttendanceStaffQuery, GetAttendanceStaffQueryVariables>(GetAttendanceStaffDocument, options);
        }
export function useGetAttendanceStaffSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAttendanceStaffQuery, GetAttendanceStaffQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAttendanceStaffQuery, GetAttendanceStaffQueryVariables>(GetAttendanceStaffDocument, options);
        }
export type GetAttendanceStaffQueryHookResult = ReturnType<typeof useGetAttendanceStaffQuery>;
export type GetAttendanceStaffLazyQueryHookResult = ReturnType<typeof useGetAttendanceStaffLazyQuery>;
export type GetAttendanceStaffSuspenseQueryHookResult = ReturnType<typeof useGetAttendanceStaffSuspenseQuery>;
export type GetAttendanceStaffQueryResult = Apollo.QueryResult<GetAttendanceStaffQuery, GetAttendanceStaffQueryVariables>;
export const ShiftListDocument = gql`
    query shiftList($limit: Int, $offset: Int, $users: [Int], $fromDate: String, $toDate: String) {
  shiftList(
    limit: $limit
    offset: $offset
    users: $users
    fromDate: $fromDate
    toDate: $toDate
  ) {
    id
    open
    openCurrency {
      khr
      usd
    }
    close
    closeCurrency {
      usd
      khr
    }
    card
    bill
    bank
    deposit
    expectedCurrency {
      usd
      khr
    }
    note
    user {
      id
      username
      display
      profile
    }
    customer
    customerAvgCost
  }
}
    `;

/**
 * __useShiftListQuery__
 *
 * To run a query within a React component, call `useShiftListQuery` and pass it any options that fit your needs.
 * When your component renders, `useShiftListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShiftListQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      users: // value for 'users'
 *      fromDate: // value for 'fromDate'
 *      toDate: // value for 'toDate'
 *   },
 * });
 */
export function useShiftListQuery(baseOptions?: Apollo.QueryHookOptions<ShiftListQuery, ShiftListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShiftListQuery, ShiftListQueryVariables>(ShiftListDocument, options);
      }
export function useShiftListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShiftListQuery, ShiftListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShiftListQuery, ShiftListQueryVariables>(ShiftListDocument, options);
        }
export function useShiftListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ShiftListQuery, ShiftListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ShiftListQuery, ShiftListQueryVariables>(ShiftListDocument, options);
        }
export type ShiftListQueryHookResult = ReturnType<typeof useShiftListQuery>;
export type ShiftListLazyQueryHookResult = ReturnType<typeof useShiftListLazyQuery>;
export type ShiftListSuspenseQueryHookResult = ReturnType<typeof useShiftListSuspenseQuery>;
export type ShiftListQueryResult = Apollo.QueryResult<ShiftListQuery, ShiftListQueryVariables>;
export const ShiftByIdDocument = gql`
    query shiftById($id: Int, $date: String, $userId: Int) {
  shiftById(id: $id, date: $date, userId: $userId) {
    id
    open
    openCurrency {
      khr
      usd
    }
    close
    closeCurrency {
      usd
      khr
    }
    card
    bill
    bank
    deposit
    expectedCurrency {
      usd
      khr
    }
    note
    user {
      id
      username
      display
      profile
    }
    customer
    customerAvgCost
  }
}
    `;

/**
 * __useShiftByIdQuery__
 *
 * To run a query within a React component, call `useShiftByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useShiftByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShiftByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *      date: // value for 'date'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useShiftByIdQuery(baseOptions?: Apollo.QueryHookOptions<ShiftByIdQuery, ShiftByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShiftByIdQuery, ShiftByIdQueryVariables>(ShiftByIdDocument, options);
      }
export function useShiftByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShiftByIdQuery, ShiftByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShiftByIdQuery, ShiftByIdQueryVariables>(ShiftByIdDocument, options);
        }
export function useShiftByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ShiftByIdQuery, ShiftByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ShiftByIdQuery, ShiftByIdQueryVariables>(ShiftByIdDocument, options);
        }
export type ShiftByIdQueryHookResult = ReturnType<typeof useShiftByIdQuery>;
export type ShiftByIdLazyQueryHookResult = ReturnType<typeof useShiftByIdLazyQuery>;
export type ShiftByIdSuspenseQueryHookResult = ReturnType<typeof useShiftByIdSuspenseQuery>;
export type ShiftByIdQueryResult = Apollo.QueryResult<ShiftByIdQuery, ShiftByIdQueryVariables>;
export const LeaveListDocument = gql`
    query leaveList($to: String, $from: String, $status: [LeaveStatus], $offset: Int, $limit: Int) {
  leaveList(to: $to, from: $from, status: $status, offset: $offset, limit: $limit) {
    id
    startDate
    endDate
    duration
    leaveReason
    leaveType
    status
    rejectedBy {
      id
      display
      profile
    }
    rejectedDate
    requestedBy {
      id
      display
      profile
    }
    requestedDate
    approvedBy {
      id
      display
      profile
    }
    approvedDate
    cancelledBy {
      id
      display
      profile
    }
    cancelledDate
  }
}
    `;

/**
 * __useLeaveListQuery__
 *
 * To run a query within a React component, call `useLeaveListQuery` and pass it any options that fit your needs.
 * When your component renders, `useLeaveListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLeaveListQuery({
 *   variables: {
 *      to: // value for 'to'
 *      from: // value for 'from'
 *      status: // value for 'status'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useLeaveListQuery(baseOptions?: Apollo.QueryHookOptions<LeaveListQuery, LeaveListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LeaveListQuery, LeaveListQueryVariables>(LeaveListDocument, options);
      }
export function useLeaveListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LeaveListQuery, LeaveListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LeaveListQuery, LeaveListQueryVariables>(LeaveListDocument, options);
        }
export function useLeaveListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LeaveListQuery, LeaveListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LeaveListQuery, LeaveListQueryVariables>(LeaveListDocument, options);
        }
export type LeaveListQueryHookResult = ReturnType<typeof useLeaveListQuery>;
export type LeaveListLazyQueryHookResult = ReturnType<typeof useLeaveListLazyQuery>;
export type LeaveListSuspenseQueryHookResult = ReturnType<typeof useLeaveListSuspenseQuery>;
export type LeaveListQueryResult = Apollo.QueryResult<LeaveListQuery, LeaveListQueryVariables>;
export const LeaveDocument = gql`
    query leave($leaveId: Int!) {
  leave(id: $leaveId) {
    id
    startDate
    endDate
    duration
    leaveReason
    leaveType
    status
    rejectedBy {
      id
      display
      profile
    }
    rejectedDate
    requestedBy {
      id
      display
      profile
    }
    requestedDate
    approvedBy {
      id
      display
      profile
    }
    approvedDate
    cancelledBy {
      id
      display
      profile
    }
    cancelledDate
  }
}
    `;

/**
 * __useLeaveQuery__
 *
 * To run a query within a React component, call `useLeaveQuery` and pass it any options that fit your needs.
 * When your component renders, `useLeaveQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLeaveQuery({
 *   variables: {
 *      leaveId: // value for 'leaveId'
 *   },
 * });
 */
export function useLeaveQuery(baseOptions: Apollo.QueryHookOptions<LeaveQuery, LeaveQueryVariables> & ({ variables: LeaveQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LeaveQuery, LeaveQueryVariables>(LeaveDocument, options);
      }
export function useLeaveLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LeaveQuery, LeaveQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LeaveQuery, LeaveQueryVariables>(LeaveDocument, options);
        }
export function useLeaveSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LeaveQuery, LeaveQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LeaveQuery, LeaveQueryVariables>(LeaveDocument, options);
        }
export type LeaveQueryHookResult = ReturnType<typeof useLeaveQuery>;
export type LeaveLazyQueryHookResult = ReturnType<typeof useLeaveLazyQuery>;
export type LeaveSuspenseQueryHookResult = ReturnType<typeof useLeaveSuspenseQuery>;
export type LeaveQueryResult = Apollo.QueryResult<LeaveQuery, LeaveQueryVariables>;
export const AttendanceListAdminDocument = gql`
    query attendanceListAdmin($month: Int!, $year: Int!) {
  attendanceListAdmin(month: $month, year: $year) {
    checkIn
    checkOut
    checkDate
    id
    user {
      id
      display
      profile
      fromTime
      toTime
    }
    leave {
      id
      startDate
      endDate
      leaveReason
      leaveType
      approvedBy {
        id
        display
      }
      approvedDate
    }
    type
    overTimeOut
    overTimeIn
  }
}
    `;

/**
 * __useAttendanceListAdminQuery__
 *
 * To run a query within a React component, call `useAttendanceListAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttendanceListAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttendanceListAdminQuery({
 *   variables: {
 *      month: // value for 'month'
 *      year: // value for 'year'
 *   },
 * });
 */
export function useAttendanceListAdminQuery(baseOptions: Apollo.QueryHookOptions<AttendanceListAdminQuery, AttendanceListAdminQueryVariables> & ({ variables: AttendanceListAdminQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AttendanceListAdminQuery, AttendanceListAdminQueryVariables>(AttendanceListAdminDocument, options);
      }
export function useAttendanceListAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AttendanceListAdminQuery, AttendanceListAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AttendanceListAdminQuery, AttendanceListAdminQueryVariables>(AttendanceListAdminDocument, options);
        }
export function useAttendanceListAdminSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AttendanceListAdminQuery, AttendanceListAdminQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AttendanceListAdminQuery, AttendanceListAdminQueryVariables>(AttendanceListAdminDocument, options);
        }
export type AttendanceListAdminQueryHookResult = ReturnType<typeof useAttendanceListAdminQuery>;
export type AttendanceListAdminLazyQueryHookResult = ReturnType<typeof useAttendanceListAdminLazyQuery>;
export type AttendanceListAdminSuspenseQueryHookResult = ReturnType<typeof useAttendanceListAdminSuspenseQuery>;
export type AttendanceListAdminQueryResult = Apollo.QueryResult<AttendanceListAdminQuery, AttendanceListAdminQueryVariables>;
export const GetSummaryAttendanceStaffDocument = gql`
    query getSummaryAttendanceStaff($userId: Int!) {
  getSummaryAttendanceStaff(userId: $userId)
}
    `;

/**
 * __useGetSummaryAttendanceStaffQuery__
 *
 * To run a query within a React component, call `useGetSummaryAttendanceStaffQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSummaryAttendanceStaffQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSummaryAttendanceStaffQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetSummaryAttendanceStaffQuery(baseOptions: Apollo.QueryHookOptions<GetSummaryAttendanceStaffQuery, GetSummaryAttendanceStaffQueryVariables> & ({ variables: GetSummaryAttendanceStaffQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSummaryAttendanceStaffQuery, GetSummaryAttendanceStaffQueryVariables>(GetSummaryAttendanceStaffDocument, options);
      }
export function useGetSummaryAttendanceStaffLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSummaryAttendanceStaffQuery, GetSummaryAttendanceStaffQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSummaryAttendanceStaffQuery, GetSummaryAttendanceStaffQueryVariables>(GetSummaryAttendanceStaffDocument, options);
        }
export function useGetSummaryAttendanceStaffSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSummaryAttendanceStaffQuery, GetSummaryAttendanceStaffQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSummaryAttendanceStaffQuery, GetSummaryAttendanceStaffQueryVariables>(GetSummaryAttendanceStaffDocument, options);
        }
export type GetSummaryAttendanceStaffQueryHookResult = ReturnType<typeof useGetSummaryAttendanceStaffQuery>;
export type GetSummaryAttendanceStaffLazyQueryHookResult = ReturnType<typeof useGetSummaryAttendanceStaffLazyQuery>;
export type GetSummaryAttendanceStaffSuspenseQueryHookResult = ReturnType<typeof useGetSummaryAttendanceStaffSuspenseQuery>;
export type GetSummaryAttendanceStaffQueryResult = Apollo.QueryResult<GetSummaryAttendanceStaffQuery, GetSummaryAttendanceStaffQueryVariables>;
export const OverTimeListDocument = gql`
    query overTimeList($limit: Int, $offset: Int, $status: [OverTimeStatus], $from: String, $to: String) {
  overTimeList(
    limit: $limit
    offset: $offset
    status: $status
    from: $from
    to: $to
  ) {
    id
    startat
    endAt
    otDate
    note
    status
    approvedDate
    approvedBy {
      id
      display
      profile
    }
    requestedDate
    rejectedBy {
      id
      display
      profile
    }
    rejectedDate
    requestedBy {
      id
      display
      profile
    }
    cancelledDate
    cancelledBy {
      id
      display
      profile
    }
  }
}
    `;

/**
 * __useOverTimeListQuery__
 *
 * To run a query within a React component, call `useOverTimeListQuery` and pass it any options that fit your needs.
 * When your component renders, `useOverTimeListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOverTimeListQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      status: // value for 'status'
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useOverTimeListQuery(baseOptions?: Apollo.QueryHookOptions<OverTimeListQuery, OverTimeListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OverTimeListQuery, OverTimeListQueryVariables>(OverTimeListDocument, options);
      }
export function useOverTimeListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OverTimeListQuery, OverTimeListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OverTimeListQuery, OverTimeListQueryVariables>(OverTimeListDocument, options);
        }
export function useOverTimeListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OverTimeListQuery, OverTimeListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OverTimeListQuery, OverTimeListQueryVariables>(OverTimeListDocument, options);
        }
export type OverTimeListQueryHookResult = ReturnType<typeof useOverTimeListQuery>;
export type OverTimeListLazyQueryHookResult = ReturnType<typeof useOverTimeListLazyQuery>;
export type OverTimeListSuspenseQueryHookResult = ReturnType<typeof useOverTimeListSuspenseQuery>;
export type OverTimeListQueryResult = Apollo.QueryResult<OverTimeListQuery, OverTimeListQueryVariables>;
export const OverTimeDocument = gql`
    query overTime($overTimeId: Int!) {
  overTime(id: $overTimeId) {
    id
    startat
    endAt
    otDate
    note
    status
    approvedDate
    approvedBy {
      id
      display
      profile
    }
    requestedDate
    rejectedBy {
      id
      display
      profile
    }
    rejectedDate
    requestedBy {
      id
      display
      profile
    }
    cancelledDate
    cancelledBy {
      id
      display
      profile
    }
  }
}
    `;

/**
 * __useOverTimeQuery__
 *
 * To run a query within a React component, call `useOverTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useOverTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOverTimeQuery({
 *   variables: {
 *      overTimeId: // value for 'overTimeId'
 *   },
 * });
 */
export function useOverTimeQuery(baseOptions: Apollo.QueryHookOptions<OverTimeQuery, OverTimeQueryVariables> & ({ variables: OverTimeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OverTimeQuery, OverTimeQueryVariables>(OverTimeDocument, options);
      }
export function useOverTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OverTimeQuery, OverTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OverTimeQuery, OverTimeQueryVariables>(OverTimeDocument, options);
        }
export function useOverTimeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OverTimeQuery, OverTimeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OverTimeQuery, OverTimeQueryVariables>(OverTimeDocument, options);
        }
export type OverTimeQueryHookResult = ReturnType<typeof useOverTimeQuery>;
export type OverTimeLazyQueryHookResult = ReturnType<typeof useOverTimeLazyQuery>;
export type OverTimeSuspenseQueryHookResult = ReturnType<typeof useOverTimeSuspenseQuery>;
export type OverTimeQueryResult = Apollo.QueryResult<OverTimeQuery, OverTimeQueryVariables>;
export const OrderBalanceSummaryDocument = gql`
    query orderBalanceSummary($from: String, $to: String) {
  orderBalanceSummary(from: $from, to: $to)
}
    `;

/**
 * __useOrderBalanceSummaryQuery__
 *
 * To run a query within a React component, call `useOrderBalanceSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderBalanceSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderBalanceSummaryQuery({
 *   variables: {
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useOrderBalanceSummaryQuery(baseOptions?: Apollo.QueryHookOptions<OrderBalanceSummaryQuery, OrderBalanceSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderBalanceSummaryQuery, OrderBalanceSummaryQueryVariables>(OrderBalanceSummaryDocument, options);
      }
export function useOrderBalanceSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderBalanceSummaryQuery, OrderBalanceSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderBalanceSummaryQuery, OrderBalanceSummaryQueryVariables>(OrderBalanceSummaryDocument, options);
        }
export function useOrderBalanceSummarySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrderBalanceSummaryQuery, OrderBalanceSummaryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrderBalanceSummaryQuery, OrderBalanceSummaryQueryVariables>(OrderBalanceSummaryDocument, options);
        }
export type OrderBalanceSummaryQueryHookResult = ReturnType<typeof useOrderBalanceSummaryQuery>;
export type OrderBalanceSummaryLazyQueryHookResult = ReturnType<typeof useOrderBalanceSummaryLazyQuery>;
export type OrderBalanceSummarySuspenseQueryHookResult = ReturnType<typeof useOrderBalanceSummarySuspenseQuery>;
export type OrderBalanceSummaryQueryResult = Apollo.QueryResult<OrderBalanceSummaryQuery, OrderBalanceSummaryQueryVariables>;
export const TopProductSellDocument = gql`
    query topProductSell($from: String, $to: String, $limit: Int = 10) {
  topProductSell(from: $from, to: $to, limit: $limit) {
    product {
      id
      code
      title
      images
    }
    sku {
      id
      name
      image
      price
      discount
      unit
    }
    qty
    total
  }
}
    `;

/**
 * __useTopProductSellQuery__
 *
 * To run a query within a React component, call `useTopProductSellQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopProductSellQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopProductSellQuery({
 *   variables: {
 *      from: // value for 'from'
 *      to: // value for 'to'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useTopProductSellQuery(baseOptions?: Apollo.QueryHookOptions<TopProductSellQuery, TopProductSellQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TopProductSellQuery, TopProductSellQueryVariables>(TopProductSellDocument, options);
      }
export function useTopProductSellLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopProductSellQuery, TopProductSellQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TopProductSellQuery, TopProductSellQueryVariables>(TopProductSellDocument, options);
        }
export function useTopProductSellSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TopProductSellQuery, TopProductSellQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TopProductSellQuery, TopProductSellQueryVariables>(TopProductSellDocument, options);
        }
export type TopProductSellQueryHookResult = ReturnType<typeof useTopProductSellQuery>;
export type TopProductSellLazyQueryHookResult = ReturnType<typeof useTopProductSellLazyQuery>;
export type TopProductSellSuspenseQueryHookResult = ReturnType<typeof useTopProductSellSuspenseQuery>;
export type TopProductSellQueryResult = Apollo.QueryResult<TopProductSellQuery, TopProductSellQueryVariables>;
export const OrderItemDocument = gql`
    query orderItem($orderItemId: Int!) {
  orderItem(id: $orderItemId)
}
    `;

/**
 * __useOrderItemQuery__
 *
 * To run a query within a React component, call `useOrderItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderItemQuery({
 *   variables: {
 *      orderItemId: // value for 'orderItemId'
 *   },
 * });
 */
export function useOrderItemQuery(baseOptions: Apollo.QueryHookOptions<OrderItemQuery, OrderItemQueryVariables> & ({ variables: OrderItemQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderItemQuery, OrderItemQueryVariables>(OrderItemDocument, options);
      }
export function useOrderItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderItemQuery, OrderItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderItemQuery, OrderItemQueryVariables>(OrderItemDocument, options);
        }
export function useOrderItemSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrderItemQuery, OrderItemQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrderItemQuery, OrderItemQueryVariables>(OrderItemDocument, options);
        }
export type OrderItemQueryHookResult = ReturnType<typeof useOrderItemQuery>;
export type OrderItemLazyQueryHookResult = ReturnType<typeof useOrderItemLazyQuery>;
export type OrderItemSuspenseQueryHookResult = ReturnType<typeof useOrderItemSuspenseQuery>;
export type OrderItemQueryResult = Apollo.QueryResult<OrderItemQuery, OrderItemQueryVariables>;
export const ReportSaleByDayDocument = gql`
    query reportSaleByDay($from: String, $to: String) {
  reportSaleByDay(from: $from, to: $to)
}
    `;

/**
 * __useReportSaleByDayQuery__
 *
 * To run a query within a React component, call `useReportSaleByDayQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportSaleByDayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportSaleByDayQuery({
 *   variables: {
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useReportSaleByDayQuery(baseOptions?: Apollo.QueryHookOptions<ReportSaleByDayQuery, ReportSaleByDayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportSaleByDayQuery, ReportSaleByDayQueryVariables>(ReportSaleByDayDocument, options);
      }
export function useReportSaleByDayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportSaleByDayQuery, ReportSaleByDayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportSaleByDayQuery, ReportSaleByDayQueryVariables>(ReportSaleByDayDocument, options);
        }
export function useReportSaleByDaySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ReportSaleByDayQuery, ReportSaleByDayQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReportSaleByDayQuery, ReportSaleByDayQueryVariables>(ReportSaleByDayDocument, options);
        }
export type ReportSaleByDayQueryHookResult = ReturnType<typeof useReportSaleByDayQuery>;
export type ReportSaleByDayLazyQueryHookResult = ReturnType<typeof useReportSaleByDayLazyQuery>;
export type ReportSaleByDaySuspenseQueryHookResult = ReturnType<typeof useReportSaleByDaySuspenseQuery>;
export type ReportSaleByDayQueryResult = Apollo.QueryResult<ReportSaleByDayQuery, ReportSaleByDayQueryVariables>;
export const ReportStaffPayrollDocument = gql`
    query reportStaffPayroll($from: String, $to: String) {
  reportStaffPayroll(from: $from, to: $to)
}
    `;

/**
 * __useReportStaffPayrollQuery__
 *
 * To run a query within a React component, call `useReportStaffPayrollQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportStaffPayrollQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportStaffPayrollQuery({
 *   variables: {
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useReportStaffPayrollQuery(baseOptions?: Apollo.QueryHookOptions<ReportStaffPayrollQuery, ReportStaffPayrollQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportStaffPayrollQuery, ReportStaffPayrollQueryVariables>(ReportStaffPayrollDocument, options);
      }
export function useReportStaffPayrollLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportStaffPayrollQuery, ReportStaffPayrollQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportStaffPayrollQuery, ReportStaffPayrollQueryVariables>(ReportStaffPayrollDocument, options);
        }
export function useReportStaffPayrollSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ReportStaffPayrollQuery, ReportStaffPayrollQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReportStaffPayrollQuery, ReportStaffPayrollQueryVariables>(ReportStaffPayrollDocument, options);
        }
export type ReportStaffPayrollQueryHookResult = ReturnType<typeof useReportStaffPayrollQuery>;
export type ReportStaffPayrollLazyQueryHookResult = ReturnType<typeof useReportStaffPayrollLazyQuery>;
export type ReportStaffPayrollSuspenseQueryHookResult = ReturnType<typeof useReportStaffPayrollSuspenseQuery>;
export type ReportStaffPayrollQueryResult = Apollo.QueryResult<ReportStaffPayrollQuery, ReportStaffPayrollQueryVariables>;
export const HolidayListDocument = gql`
    query holidayList {
  holidayList {
    date
    extra
    id
    name
  }
}
    `;

/**
 * __useHolidayListQuery__
 *
 * To run a query within a React component, call `useHolidayListQuery` and pass it any options that fit your needs.
 * When your component renders, `useHolidayListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHolidayListQuery({
 *   variables: {
 *   },
 * });
 */
export function useHolidayListQuery(baseOptions?: Apollo.QueryHookOptions<HolidayListQuery, HolidayListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HolidayListQuery, HolidayListQueryVariables>(HolidayListDocument, options);
      }
export function useHolidayListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HolidayListQuery, HolidayListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HolidayListQuery, HolidayListQueryVariables>(HolidayListDocument, options);
        }
export function useHolidayListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HolidayListQuery, HolidayListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HolidayListQuery, HolidayListQueryVariables>(HolidayListDocument, options);
        }
export type HolidayListQueryHookResult = ReturnType<typeof useHolidayListQuery>;
export type HolidayListLazyQueryHookResult = ReturnType<typeof useHolidayListLazyQuery>;
export type HolidayListSuspenseQueryHookResult = ReturnType<typeof useHolidayListSuspenseQuery>;
export type HolidayListQueryResult = Apollo.QueryResult<HolidayListQuery, HolidayListQueryVariables>;
export const HolidayDocument = gql`
    query holiday($holidayId: Int!) {
  holiday(id: $holidayId) {
    id
    name
    date
    extra
  }
}
    `;

/**
 * __useHolidayQuery__
 *
 * To run a query within a React component, call `useHolidayQuery` and pass it any options that fit your needs.
 * When your component renders, `useHolidayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHolidayQuery({
 *   variables: {
 *      holidayId: // value for 'holidayId'
 *   },
 * });
 */
export function useHolidayQuery(baseOptions: Apollo.QueryHookOptions<HolidayQuery, HolidayQueryVariables> & ({ variables: HolidayQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HolidayQuery, HolidayQueryVariables>(HolidayDocument, options);
      }
export function useHolidayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HolidayQuery, HolidayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HolidayQuery, HolidayQueryVariables>(HolidayDocument, options);
        }
export function useHolidaySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HolidayQuery, HolidayQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HolidayQuery, HolidayQueryVariables>(HolidayDocument, options);
        }
export type HolidayQueryHookResult = ReturnType<typeof useHolidayQuery>;
export type HolidayLazyQueryHookResult = ReturnType<typeof useHolidayLazyQuery>;
export type HolidaySuspenseQueryHookResult = ReturnType<typeof useHolidaySuspenseQuery>;
export type HolidayQueryResult = Apollo.QueryResult<HolidayQuery, HolidayQueryVariables>;
export const ReportSaleProductDocument = gql`
    query reportSaleProduct($from: String, $to: String, $filters: ReportSaleFilter, $groupBy: ReportSaleGroupBy) {
  reportSaleProduct(from: $from, to: $to, filters: $filters, groupBy: $groupBy)
}
    `;

/**
 * __useReportSaleProductQuery__
 *
 * To run a query within a React component, call `useReportSaleProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportSaleProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportSaleProductQuery({
 *   variables: {
 *      from: // value for 'from'
 *      to: // value for 'to'
 *      filters: // value for 'filters'
 *      groupBy: // value for 'groupBy'
 *   },
 * });
 */
export function useReportSaleProductQuery(baseOptions?: Apollo.QueryHookOptions<ReportSaleProductQuery, ReportSaleProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportSaleProductQuery, ReportSaleProductQueryVariables>(ReportSaleProductDocument, options);
      }
export function useReportSaleProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportSaleProductQuery, ReportSaleProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportSaleProductQuery, ReportSaleProductQueryVariables>(ReportSaleProductDocument, options);
        }
export function useReportSaleProductSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ReportSaleProductQuery, ReportSaleProductQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReportSaleProductQuery, ReportSaleProductQueryVariables>(ReportSaleProductDocument, options);
        }
export type ReportSaleProductQueryHookResult = ReturnType<typeof useReportSaleProductQuery>;
export type ReportSaleProductLazyQueryHookResult = ReturnType<typeof useReportSaleProductLazyQuery>;
export type ReportSaleProductSuspenseQueryHookResult = ReturnType<typeof useReportSaleProductSuspenseQuery>;
export type ReportSaleProductQueryResult = Apollo.QueryResult<ReportSaleProductQuery, ReportSaleProductQueryVariables>;
export const OrderScheduleListDocument = gql`
    query orderScheduleList {
  orderScheduleList {
    id
    startAt
    endAt
    name
    items {
      sku {
        id
        image
        price
        discount
        product {
          id
          images
          title
        }
      }
    }
  }
}
    `;

/**
 * __useOrderScheduleListQuery__
 *
 * To run a query within a React component, call `useOrderScheduleListQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderScheduleListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderScheduleListQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrderScheduleListQuery(baseOptions?: Apollo.QueryHookOptions<OrderScheduleListQuery, OrderScheduleListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderScheduleListQuery, OrderScheduleListQueryVariables>(OrderScheduleListDocument, options);
      }
export function useOrderScheduleListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderScheduleListQuery, OrderScheduleListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderScheduleListQuery, OrderScheduleListQueryVariables>(OrderScheduleListDocument, options);
        }
export function useOrderScheduleListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrderScheduleListQuery, OrderScheduleListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrderScheduleListQuery, OrderScheduleListQueryVariables>(OrderScheduleListDocument, options);
        }
export type OrderScheduleListQueryHookResult = ReturnType<typeof useOrderScheduleListQuery>;
export type OrderScheduleListLazyQueryHookResult = ReturnType<typeof useOrderScheduleListLazyQuery>;
export type OrderScheduleListSuspenseQueryHookResult = ReturnType<typeof useOrderScheduleListSuspenseQuery>;
export type OrderScheduleListQueryResult = Apollo.QueryResult<OrderScheduleListQuery, OrderScheduleListQueryVariables>;
export const OrderScheduleDocument = gql`
    query orderSchedule($orderScheduleId: Int!) {
  orderSchedule(id: $orderScheduleId) {
    id
    startAt
    endAt
    name
    items {
      sku {
        id
        image
        price
        discount
        product {
          id
          images
          title
        }
      }
    }
  }
}
    `;

/**
 * __useOrderScheduleQuery__
 *
 * To run a query within a React component, call `useOrderScheduleQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderScheduleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderScheduleQuery({
 *   variables: {
 *      orderScheduleId: // value for 'orderScheduleId'
 *   },
 * });
 */
export function useOrderScheduleQuery(baseOptions: Apollo.QueryHookOptions<OrderScheduleQuery, OrderScheduleQueryVariables> & ({ variables: OrderScheduleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderScheduleQuery, OrderScheduleQueryVariables>(OrderScheduleDocument, options);
      }
export function useOrderScheduleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderScheduleQuery, OrderScheduleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderScheduleQuery, OrderScheduleQueryVariables>(OrderScheduleDocument, options);
        }
export function useOrderScheduleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrderScheduleQuery, OrderScheduleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrderScheduleQuery, OrderScheduleQueryVariables>(OrderScheduleDocument, options);
        }
export type OrderScheduleQueryHookResult = ReturnType<typeof useOrderScheduleQuery>;
export type OrderScheduleLazyQueryHookResult = ReturnType<typeof useOrderScheduleLazyQuery>;
export type OrderScheduleSuspenseQueryHookResult = ReturnType<typeof useOrderScheduleSuspenseQuery>;
export type OrderScheduleQueryResult = Apollo.QueryResult<OrderScheduleQuery, OrderScheduleQueryVariables>;
export const CheckHaveOpenShiftTodayDocument = gql`
    query checkHaveOpenShiftToday {
  checkHaveOpenShiftToday
}
    `;

/**
 * __useCheckHaveOpenShiftTodayQuery__
 *
 * To run a query within a React component, call `useCheckHaveOpenShiftTodayQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckHaveOpenShiftTodayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckHaveOpenShiftTodayQuery({
 *   variables: {
 *   },
 * });
 */
export function useCheckHaveOpenShiftTodayQuery(baseOptions?: Apollo.QueryHookOptions<CheckHaveOpenShiftTodayQuery, CheckHaveOpenShiftTodayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckHaveOpenShiftTodayQuery, CheckHaveOpenShiftTodayQueryVariables>(CheckHaveOpenShiftTodayDocument, options);
      }
export function useCheckHaveOpenShiftTodayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckHaveOpenShiftTodayQuery, CheckHaveOpenShiftTodayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckHaveOpenShiftTodayQuery, CheckHaveOpenShiftTodayQueryVariables>(CheckHaveOpenShiftTodayDocument, options);
        }
export function useCheckHaveOpenShiftTodaySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CheckHaveOpenShiftTodayQuery, CheckHaveOpenShiftTodayQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckHaveOpenShiftTodayQuery, CheckHaveOpenShiftTodayQueryVariables>(CheckHaveOpenShiftTodayDocument, options);
        }
export type CheckHaveOpenShiftTodayQueryHookResult = ReturnType<typeof useCheckHaveOpenShiftTodayQuery>;
export type CheckHaveOpenShiftTodayLazyQueryHookResult = ReturnType<typeof useCheckHaveOpenShiftTodayLazyQuery>;
export type CheckHaveOpenShiftTodaySuspenseQueryHookResult = ReturnType<typeof useCheckHaveOpenShiftTodaySuspenseQuery>;
export type CheckHaveOpenShiftTodayQueryResult = Apollo.QueryResult<CheckHaveOpenShiftTodayQuery, CheckHaveOpenShiftTodayQueryVariables>;
export const TransactionStockListDocument = gql`
    query transactionStockList($offset: Int, $limit: Int) {
  transactionStockList(offset: $offset, limit: $limit) {
    id
    product {
      id
      code
      images
      title
      description
    }
    sku {
      id
      unit
      price
      discount
      name
      image
    }
    type
    qty
    by {
      id
      display
    }
    date
  }
}
    `;

/**
 * __useTransactionStockListQuery__
 *
 * To run a query within a React component, call `useTransactionStockListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionStockListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionStockListQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useTransactionStockListQuery(baseOptions?: Apollo.QueryHookOptions<TransactionStockListQuery, TransactionStockListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionStockListQuery, TransactionStockListQueryVariables>(TransactionStockListDocument, options);
      }
export function useTransactionStockListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionStockListQuery, TransactionStockListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionStockListQuery, TransactionStockListQueryVariables>(TransactionStockListDocument, options);
        }
export function useTransactionStockListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TransactionStockListQuery, TransactionStockListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TransactionStockListQuery, TransactionStockListQueryVariables>(TransactionStockListDocument, options);
        }
export type TransactionStockListQueryHookResult = ReturnType<typeof useTransactionStockListQuery>;
export type TransactionStockListLazyQueryHookResult = ReturnType<typeof useTransactionStockListLazyQuery>;
export type TransactionStockListSuspenseQueryHookResult = ReturnType<typeof useTransactionStockListSuspenseQuery>;
export type TransactionStockListQueryResult = Apollo.QueryResult<TransactionStockListQuery, TransactionStockListQueryVariables>;
export const SubscriptionLoadDocument = gql`
    subscription subscriptionLoad($channel: String) {
  newOrderPending(channel: $channel)
}
    `;

/**
 * __useSubscriptionLoadSubscription__
 *
 * To run a query within a React component, call `useSubscriptionLoadSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscriptionLoadSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscriptionLoadSubscription({
 *   variables: {
 *      channel: // value for 'channel'
 *   },
 * });
 */
export function useSubscriptionLoadSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscriptionLoadSubscription, SubscriptionLoadSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscriptionLoadSubscription, SubscriptionLoadSubscriptionVariables>(SubscriptionLoadDocument, options);
      }
export type SubscriptionLoadSubscriptionHookResult = ReturnType<typeof useSubscriptionLoadSubscription>;
export type SubscriptionLoadSubscriptionResult = Apollo.SubscriptionResult<SubscriptionLoadSubscription>;
export const OrderSubscriptDocument = gql`
    subscription orderSubscript($channel: String) {
  orderSubscript(channel: $channel)
}
    `;

/**
 * __useOrderSubscriptSubscription__
 *
 * To run a query within a React component, call `useOrderSubscriptSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOrderSubscriptSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderSubscriptSubscription({
 *   variables: {
 *      channel: // value for 'channel'
 *   },
 * });
 */
export function useOrderSubscriptSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OrderSubscriptSubscription, OrderSubscriptSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OrderSubscriptSubscription, OrderSubscriptSubscriptionVariables>(OrderSubscriptDocument, options);
      }
export type OrderSubscriptSubscriptionHookResult = ReturnType<typeof useOrderSubscriptSubscription>;
export type OrderSubscriptSubscriptionResult = Apollo.SubscriptionResult<OrderSubscriptSubscription>;