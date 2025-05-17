use anchor_lang::prelude::*;
use anchor_spl::token::Mint;

#[account]
pub struct Market {
    pub version: u8,
    pub market_authority: Pubkey,
    pub market_owner: Pubkey,
    pub reserves: Vec<Reserve>,
    pub total_reserves: u8,
    pub total_obligations: u64,
    pub last_update_timestamp: i64,
    pub last_update_slot: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Reserve {
    pub mint: Pubkey,
    pub decimals: u8,
    pub reserve_liquidity: ReserveLiquidity,
    pub reserve_collateral: ReserveCollateral,
    pub config: ReserveConfig,
    pub last_update_timestamp: i64,
    pub last_update_slot: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ReserveLiquidity {
    pub mint: Pubkey,
    pub supply: u64,
    pub fee_receiver: Pubkey,
    pub available_amount: u64,
    pub borrowed_amount: u64,
    pub cumulative_borrow_rate: u64,
    pub market_price: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ReserveCollateral {
    pub mint: Pubkey,
    pub supply: u64,
    pub total_deposits: u64,
    pub total_borrows: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ReserveConfig {
    pub optimal_utilization_rate: u8,
    pub loan_to_value_ratio: u8,
    pub liquidation_bonus: u8,
    pub liquidation_threshold: u8,
    pub min_borrow_rate: u8,
    pub optimal_borrow_rate: u8,
    pub max_borrow_rate: u8,
    pub fees: ReserveFees,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ReserveFees {
    pub borrow_fee: u8,
    pub flash_loan_fee: u8,
    pub host_fee: u8,
}

impl Market {
    pub const LEN: usize = 32 + 50 + 8 + 1; // admin + market_id + reserve_count + bump
}