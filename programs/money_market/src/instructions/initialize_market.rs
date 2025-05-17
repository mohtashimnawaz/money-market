use anchor_lang::prelude::*;
use anchor_spl::token::Token;

use crate::{
    constants::*,
    errors::MoneyMarketError,
    state::market::Market,
};

#[derive(Accounts)]
pub struct InitializeMarket<'info> {
    #[account(
        init,
        payer = payer,
        space = 8 + std::mem::size_of::<Market>(),
        seeds = [b"market"],
        bump
    )]
    pub market: Account<'info, Market>,
    
    #[account(mut)]
    pub payer: Signer<'info>,
    
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handler(
    ctx: Context<InitializeMarket>,
    market_authority: Pubkey,
    market_owner: Pubkey,
) -> Result<()> {
    let market = &mut ctx.accounts.market;
    
    market.version = MARKET_VERSION;
    market.market_authority = market_authority;
    market.market_owner = market_owner;
    market.reserves = Vec::with_capacity(MAX_RESERVES);
    market.total_reserves = 0;
    market.total_obligations = 0;
    market.last_update_timestamp = Clock::get()?.unix_timestamp;
    market.last_update_slot = Clock::get()?.slot;
    
    Ok(())
}