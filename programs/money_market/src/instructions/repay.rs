use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

use crate::{
    errors::MoneyMarketError,
    state::{
        market::Market,
        obligation::Obligation,
    },
};

#[derive(Accounts)]
pub struct Repay<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,
    
    #[account(
        mut,
        constraint = obligation.owner == user.key() @ MoneyMarketError::InvalidObligationOwner,
        constraint = obligation.market == market.key() @ MoneyMarketError::InvalidObligationMarket,
    )]
    pub obligation: Account<'info, Obligation>,
    
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub market_token_account: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    pub token_program: Program<'info, Token>,
}

pub fn handler(ctx: Context<Repay>, amount: u64) -> Result<()> {
    require!(amount > 0, MoneyMarketError::InvalidAmount);
    
    let market = &mut ctx.accounts.market;
    let obligation = &mut ctx.accounts.obligation;
    
    // Check if user has borrowed enough to repay
    require!(
        obligation.borrowed_value >= amount,
        MoneyMarketError::InvalidAmount
    );
    
    // Transfer tokens from user to market
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.user_token_account.to_account_info(),
                to: ctx.accounts.market_token_account.to_account_info(),
                authority: ctx.accounts.user.to_account_info(),
            },
        ),
        amount,
    )?;
    
    // Update market state
    // TODO: Update market liquidity and calculate interest
    
    // Update obligation state
    // TODO: Update obligation borrows and calculate new borrowed value
    
    Ok(())
} 