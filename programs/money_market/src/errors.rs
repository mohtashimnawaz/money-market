use anchor_lang::prelude::*;

#[error_code]
pub enum MoneyMarketError {
    #[msg("Invalid market authority")]
    InvalidMarketAuthority,
    
    #[msg("Invalid market owner")]
    InvalidMarketOwner,
    
    #[msg("Invalid reserve")]
    InvalidReserve,
    
    #[msg("Invalid obligation")]
    InvalidObligation,
    
    #[msg("Insufficient liquidity")]
    InsufficientLiquidity,
    
    #[msg("Insufficient collateral")]
    InsufficientCollateral,
    
    #[msg("Invalid collateral ratio")]
    InvalidCollateralRatio,
    
    #[msg("Invalid liquidation")]
    InvalidLiquidation,
    
    #[msg("Invalid amount")]
    InvalidAmount,
    
    #[msg("Math operation overflow")]
    MathOverflow,
    
    #[msg("Invalid timestamp")]
    InvalidTimestamp,
    
    #[msg("Invalid slot")]
    InvalidSlot,
    
    #[msg("Invalid reserve config")]
    InvalidReserveConfig,
    
    #[msg("Invalid obligation owner")]
    InvalidObligationOwner,
    
    #[msg("Invalid obligation market")]
    InvalidObligationMarket,
    
    #[msg("Invalid obligation state")]
    InvalidObligationState,
    
    #[msg("Invalid obligation deposits")]
    InvalidObligationDeposits,
    
    #[msg("Invalid obligation borrows")]
    InvalidObligationBorrows,
}