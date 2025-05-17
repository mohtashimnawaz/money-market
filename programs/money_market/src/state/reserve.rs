use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ReserveConfig {
    pub loan_to_value_ratio: u64,
    pub liquidation_threshold: u64,
    pub liquidation_bonus: u64,
    pub min_borrow_amount: u64,
    pub max_borrow_amount: u64,
    pub borrow_fee: u64,
    pub flash_loan_fee: u64,
    pub collateral_exchange_rate: Rate,
    pub interest_rate_config: InterestRateConfig,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Rate {
    pub numerator: u64,
    pub denominator: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct InterestRateConfig {
    pub optimal_utilization_rate: u64,
    pub base_borrow_rate: u64,
    pub slope_1: u64,
    pub slope_2: u64,
}

#[account]
pub struct Reserve {
    pub market: Pubkey,
    pub liquidity_mint: Pubkey,
    pub liquidity_supply: Pubkey,
    pub collateral_mint: Pubkey,
    pub config: ReserveConfig,
    pub liquidity_available: u64,
    pub borrowed_amount: u64,
    pub cumulative_borrow_rate: Rate,
    pub last_update: i64,
    pub bump: u8,
    pub liquidity_supply_bump: u8,
    pub collateral_mint_bump: u8,
}

impl Reserve {
    pub const LEN: usize = 32 + 32 + 32 + 32 + 200 + 8 + 8 + 16 + 8 + 1 + 1 + 1;
}