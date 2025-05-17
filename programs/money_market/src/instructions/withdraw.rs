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
pub struct Withdraw<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,
    
    #[account(
        mut,
        constraint = obligation.owner == user.key() @ MoneyMarketError::InvalidObligationOwner,
        constraint = obligation.market == market.key() @ MoneyMarketError::InvalidObligationMarket,
    )]
    pub obligation: Account<'info, Obligation>,
    
    #[account(mut)]
    pub market_token_account: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    pub token_program: Program<'info, Token>,
}

pub fn handler(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
    require!(amount > 0, MoneyMarketError::InvalidAmount);
    
    let market = &mut ctx.accounts.market;
    let obligation = &mut ctx.accounts.obligation;
    
    // Check if user has enough deposited to withdraw
    require!(
        obligation.deposited_value >= amount,
        MoneyMarketError::InsufficientCollateral
    );
    
    // Check if withdrawal would make position unhealthy
    let new_deposited_value = obligation.deposited_value
        .checked_sub(amount)
        .ok_or(MoneyMarketError::MathOverflow)?;
    
    require!(
        new_deposited_value >= obligation.borrowed_value,
        MoneyMarketError::InvalidCollateralRatio
    );
    
    // Transfer tokens from market to user
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.market_token_account.to_account_info(),
                to: ctx.accounts.user_token_account.to_account_info(),
                authority: ctx.accounts.market.to_account_info(),
            },
        ),
        amount,
    )?;
    
    // Update market state
    // TODO: Update market liquidity and calculate interest
    
    // Update obligation state
    // TODO: Update obligation deposits and calculate new collateral value
    
    Ok(())
} 