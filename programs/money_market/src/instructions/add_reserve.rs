use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};

use crate::{
    state::{market::Market, reserve::{Reserve, ReserveConfig}},
    errors::MoneyMarketError,
};

#[derive(Accounts)]
#[instruction(liquidity_amount: u64, config: ReserveConfig)]
pub struct AddReserve<'info> {
    #[account(
        has_one = admin @ MoneyMarketError::InvalidAdmin,
        seeds = [b"market".as_ref(), market.market_id.as_bytes()],
        bump = market.bump,
    )]
    pub market: Account<'info, Market>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub liquidity_mint: Account<'info, Mint>,
    #[account(
        init,
        payer = admin,
        seeds = [
            b"reserve".as_ref(),
            market.key().as_ref(),
            liquidity_mint.key().as_ref()
        ],
        bump,
        space = 8 + Reserve::LEN,
    )]
    pub reserve: Account<'info, Reserve>,
    #[account(
        init,
        payer = admin,
        token::mint = liquidity_mint,
        token::authority = reserve,
        seeds = [
            b"reserve_liquidity_supply".as_ref(),
            reserve.key().as_ref()
        ],
        bump,
    )]
    pub reserve_liquidity_supply: Account<'info, TokenAccount>,
    #[account(
        init,
        payer = admin,
        token::mint = liquidity_mint,
        token::authority = reserve,
        seeds = [
            b"reserve_collateral_mint".as_ref(),
            reserve.key().as_ref()
        ],
        bump,
    )]
    pub reserve_collateral_mint: Account<'info, Mint>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handler(ctx: Context<AddReserve>, liquidity_amount: u64, config: ReserveConfig) -> Result<()> {
    let reserve = &mut ctx.accounts.reserve;
    reserve.market = ctx.accounts.market.key();
    reserve.liquidity_mint = ctx.accounts.liquidity_mint.key();
    reserve.liquidity_supply = ctx.accounts.reserve_liquidity_supply.key();
    reserve.collateral_mint = ctx.accounts.reserve_collateral_mint.key();
    reserve.config = config;
    reserve.liquidity_available = liquidity_amount;
    reserve.last_update = Clock::get()?.unix_timestamp;
    
    let market = &mut ctx.accounts.market;
    market.reserve_count += 1;
    
    Ok(())
}