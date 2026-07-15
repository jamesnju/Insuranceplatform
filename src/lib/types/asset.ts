import { BaseEntity, StatusEntity } from './common';

export type AssetCategory = 
  | 'phone'
  | 'laptop'
  | 'tablet'
  | 'television'
  | 'camera'
  | 'gaming_console';

export type AssetCondition = 
  | 'new'
  | 'excellent'
  | 'good'
  | 'fair'
  | 'damaged'
  | 'not_working';

export type AssetStatus =
  | 'draft'
  | 'submitted'
  | 'ai_verification_in_progress'
  | 'more_evidence_required'
  | 'under_officer_review'
  | 'verified'
  | 'rejected'
  | 'insured'
  | 'policy_expired'
  | 'suspended'
  | 'claim_in_progress';

export interface AssetImage {
  id: string;
  url: string;
  caption: string;
  order: number;
  isRequired: boolean;
  isUploaded: boolean;
  type: 'front' | 'back' | 'left' | 'right' | 'screen' | 'serial' | 'damage' | 'other';
}

export interface OwnershipEvidence {
  id: string;
  type: 'receipt' | 'invoice' | 'warranty' | 'payment' | 'seller_confirmation' | 'other';
  url: string;
  fileName: string;
  uploadDate: Date;
  extractedData?: Record<string, any>;
}

export interface Asset extends BaseEntity, StatusEntity {
  customerId: string;
  category: AssetCategory;
  brand: string;
  model: string;
  productName: string;
  serialNumber: string;
  imeiNumber?: string;
  purchaseDate: Date;
  purchasePrice: number;
  currency: string;
  sellerName: string;
  sellerPhone?: string;
  sellerLocation?: string;
  condition: AssetCondition;
  wasNew: boolean;
  currentUsage: string;
  existingDamage: string;
  description: string;
  images: AssetImage[];
  evidence: OwnershipEvidence[];
  verificationStatus: AssetStatus;
  verificationReport?: AssetVerificationReport;
  valuation?: AssetValuation;
  riskScore?: RiskScore;
}

export interface AssetVerificationReport {
  receiptExtraction: ReceiptExtraction;
  imageRecognition: ImageRecognition;
  serialNumberMatch: SerialNumberMatch;
  duplicateChecks: DuplicateCheck;
  ownershipConfidence: number;
  fraudIndicators: string[];
  missingInformation: string[];
  aiRecommendation: 'approve' | 'review' | 'reject';
}

export interface ReceiptExtraction {
  sellerName: string;
  sellerLocation: string;
  receiptNumber: string;
  purchaseDate: Date;
  productDescription: string;
  brand: string;
  model: string;
  serialNumber: string;
  imeiNumber: string;
  purchasePrice: number;
  tax: number;
  paymentMethod: string;
  confidence: number;
  flags: string[];
}

export interface ImageRecognition {
  category: AssetCategory;
  brand: string;
  model: string;
  color: string;
  condition: string;
  hasDamage: boolean;
  isPoweredOn: boolean;
  isSameAsset: boolean;
  isInternetCopy: boolean;
  isPreviouslySubmitted: boolean;
  isManipulated: boolean;
  confidence: number;
}

export interface SerialNumberMatch {
  detectedSerial: string;
  detectedIMEI: string;
  matchesEntered: boolean;
  isDuplicate: boolean;
  duplicateAssetId?: string;
  isFormatValid: boolean;
  confidence: number;
}

export interface DuplicateCheck {
  isDuplicateSerial: boolean;
  isDuplicateIMEI: boolean;
  isDuplicateImages: boolean;
  duplicateRecords: string[];
}

export interface AssetValuation {
  originalPrice: number;
  currentMarketValue: number;
  replacementValue: number;
  recommendedInsuredValue: number;
  minimumInsuredValue: number;
  maximumInsuredValue: number;
  depreciation: number;
  confidenceScore: number;
  sources: string[];
  valuationDate: Date;
}

export interface RiskScore {
  score: number;
  level: 'low' | 'medium' | 'high' | 'critical';
  factors: RiskFactor[];
  recommendation: string;
}

export interface RiskFactor {
  name: string;
  weight: number;
  score: number;
  description: string;
}