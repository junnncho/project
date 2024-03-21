/* TA-LIB Copyright (c) 1999-2007, Mario Fortier
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or
 * without modification, are permitted provided that the following
 * conditions are met:
 *
 * - Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in
 *   the documentation and/or other materials provided with the
 *   distribution.
 *
 * - Neither name of author nor the names of its contributors
 *   may be used to endorse or promote products derived from this
 *   software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
 * OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* List of contributors:
 *
 *  Initial  Name/description
 *  -------------------------------------------------------------------
 *  MHL      Matthew Lindblom
 *  MF       Mario Fortier
 *
 * Change history:
 *
 *  MMDDYY BY   Description
 *  -------------------------------------------------------------------
 *  120802 MF   Template creation.
 *  032003 MHL  Implementation of T3
 *  040503 MF   Adapt for compatibility with published code
 *              for TradeStation and Metastock.
 *              See "Smoothing Techniques For More Accurate Signals" 
 *              from Tim Tillson in Stock&Commodities V16:1 Page 33-37
 *  052603 MF   Adapt code to compile with .NET Managed C++
 */

/**** START GENCODE SECTION 1 - DO NOT DELETE THIS LINE ****/
/* All code within this section is automatically
 * generated by gen_code. Any modification will be lost
 * next time gen_code is run.
 */
/* Generated */ 
/* Generated */ #if defined( _MANAGED )
/* Generated */    #include "TA-Lib-Core.h"
/* Generated */    #define TA_INTERNAL_ERROR(Id) (RetCode::InternalError)
/* Generated */    namespace TicTacTec { namespace TA { namespace Library {
/* Generated */ #elif defined( _JAVA )
/* Generated */    #include "ta_defs.h"
/* Generated */    #include "ta_java_defs.h"
/* Generated */    #define TA_INTERNAL_ERROR(Id) (RetCode.InternalError)
/* Generated */ #else
/* Generated */    #include <string.h>
/* Generated */    #include <math.h>
/* Generated */    #include "ta_func.h"
/* Generated */ #endif
/* Generated */ 
/* Generated */ #ifndef TA_UTILITY_H
/* Generated */    #include "ta_utility.h"
/* Generated */ #endif
/* Generated */ 
/* Generated */ #ifndef TA_MEMORY_H
/* Generated */    #include "ta_memory.h"
/* Generated */ #endif
/* Generated */ 
/* Generated */ #define TA_PREFIX(x) TA_##x
/* Generated */ #define INPUT_TYPE   double
/* Generated */ 
/* Generated */ #if defined( _MANAGED )
/* Generated */ int Core::T3Lookback( int           optInTimePeriod, /* From 2 to 100000 */
/* Generated */                     double        optInVFactor )  /* From 0 to 1 */
/* Generated */ 
/* Generated */ #elif defined( _JAVA )
/* Generated */ public int t3Lookback( int           optInTimePeriod, /* From 2 to 100000 */
/* Generated */                      double        optInVFactor )  /* From 0 to 1 */
/* Generated */ 
/* Generated */ #else
/* Generated */ int TA_T3_Lookback( int           optInTimePeriod, /* From 2 to 100000 */
/* Generated */                   double        optInVFactor )  /* From 0 to 1 */
/* Generated */ 
/* Generated */ #endif
/**** END GENCODE SECTION 1 - DO NOT DELETE THIS LINE ****/
{
   /* insert local variable here */

/**** START GENCODE SECTION 2 - DO NOT DELETE THIS LINE ****/
/* Generated */ #ifndef TA_FUNC_NO_RANGE_CHECK
/* Generated */    /* min/max are checked for optInTimePeriod. */
/* Generated */    if( (int)optInTimePeriod == TA_INTEGER_DEFAULT )
/* Generated */       optInTimePeriod = 5;
/* Generated */    else if( ((int)optInTimePeriod < 2) || ((int)optInTimePeriod > 100000) )
/* Generated */       return -1;
/* Generated */ 
/* Generated */    if( optInVFactor == TA_REAL_DEFAULT )
/* Generated */       optInVFactor = 7.000000e-1;
/* Generated */    else if( (optInVFactor < 0.000000e+0) ||/* Generated */  (optInVFactor > 1.000000e+0) )
/* Generated */       return -1;
/* Generated */ 
/* Generated */ #endif /* TA_FUNC_NO_RANGE_CHECK */
/**** END GENCODE SECTION 2 - DO NOT DELETE THIS LINE ****/

   /* insert lookback code here. */
   UNUSED_VARIABLE(optInVFactor);
   return 6 * (optInTimePeriod-1) + TA_GLOBALS_UNSTABLE_PERIOD(TA_FUNC_UNST_T3,T3);
}

/**** START GENCODE SECTION 3 - DO NOT DELETE THIS LINE ****/
/*
 * TA_T3 - Triple Exponential Moving Average (T3)
 * 
 * Input  = double
 * Output = double
 * 
 * Optional Parameters
 * -------------------
 * optInTimePeriod:(From 2 to 100000)
 *    Number of period
 * 
 * optInVFactor:(From 0 to 1)
 *    Volume Factor
 * 
 * 
 */
/* Generated */ 
/* Generated */ #if defined( _MANAGED ) && defined( USE_SUBARRAY )
/* Generated */ enum class Core::RetCode Core::T3( int    startIdx,
/* Generated */                                    int    endIdx,
/* Generated */                                    SubArray^    inReal,
/* Generated */                                    int           optInTimePeriod, /* From 2 to 100000 */
/* Generated */                                    double        optInVFactor, /* From 0 to 1 */
/* Generated */                                    [Out]int%    outBegIdx,
/* Generated */                                    [Out]int%    outNBElement,
/* Generated */                                    cli::array<double>^  outReal )
/* Generated */ #elif defined( _MANAGED )
/* Generated */ enum class Core::RetCode Core::T3( int    startIdx,
/* Generated */                                    int    endIdx,
/* Generated */                                    cli::array<double>^ inReal,
/* Generated */                                    int           optInTimePeriod, /* From 2 to 100000 */
/* Generated */                                    double        optInVFactor, /* From 0 to 1 */
/* Generated */                                    [Out]int%    outBegIdx,
/* Generated */                                    [Out]int%    outNBElement,
/* Generated */                                    cli::array<double>^  outReal )
/* Generated */ #elif defined( _JAVA )
/* Generated */ public RetCode t3( int    startIdx,
/* Generated */                    int    endIdx,
/* Generated */                    double       inReal[],
/* Generated */                    int           optInTimePeriod, /* From 2 to 100000 */
/* Generated */                    double        optInVFactor, /* From 0 to 1 */
/* Generated */                    MInteger     outBegIdx,
/* Generated */                    MInteger     outNBElement,
/* Generated */                    double        outReal[] )
/* Generated */ #else
/* Generated */ TA_RetCode TA_T3( int    startIdx,
/* Generated */                   int    endIdx,
/* Generated */                   const double inReal[],
/* Generated */                   int           optInTimePeriod, /* From 2 to 100000 */
/* Generated */                   double        optInVFactor, /* From 0 to 1 */
/* Generated */                   int          *outBegIdx,
/* Generated */                   int          *outNBElement,
/* Generated */                   double        outReal[] )
/* Generated */ #endif
/**** END GENCODE SECTION 3 - DO NOT DELETE THIS LINE ****/
{
	/* insert local variable here */

   int outIdx, lookbackTotal;
   int today, i;
   double k, one_minus_k;
   double e1, e2, e3, e4, e5, e6;
   double c1, c2, c3, c4;
   double tempReal;

/**** START GENCODE SECTION 4 - DO NOT DELETE THIS LINE ****/
/* Generated */ 
/* Generated */ #ifndef TA_FUNC_NO_RANGE_CHECK
/* Generated */ 
/* Generated */    /* Validate the requested output range. */
/* Generated */    if( startIdx < 0 )
/* Generated */       return ENUM_VALUE(RetCode,TA_OUT_OF_RANGE_START_INDEX,OutOfRangeStartIndex);
/* Generated */    if( (endIdx < 0) || (endIdx < startIdx))
/* Generated */       return ENUM_VALUE(RetCode,TA_OUT_OF_RANGE_END_INDEX,OutOfRangeEndIndex);
/* Generated */ 
/* Generated */    #if !defined(_JAVA)
/* Generated */    if( !inReal ) return ENUM_VALUE(RetCode,TA_BAD_PARAM,BadParam);
/* Generated */    #endif /* !defined(_JAVA)*/
/* Generated */    /* min/max are checked for optInTimePeriod. */
/* Generated */    if( (int)optInTimePeriod == TA_INTEGER_DEFAULT )
/* Generated */       optInTimePeriod = 5;
/* Generated */    else if( ((int)optInTimePeriod < 2) || ((int)optInTimePeriod > 100000) )
/* Generated */       return ENUM_VALUE(RetCode,TA_BAD_PARAM,BadParam);
/* Generated */ 
/* Generated */    if( optInVFactor == TA_REAL_DEFAULT )
/* Generated */       optInVFactor = 7.000000e-1;
/* Generated */    else if( (optInVFactor < 0.000000e+0) ||/* Generated */  (optInVFactor > 1.000000e+0) )
/* Generated */       return ENUM_VALUE(RetCode,TA_BAD_PARAM,BadParam);
/* Generated */ 
/* Generated */    #if !defined(_JAVA)
/* Generated */    if( !outReal )
/* Generated */       return ENUM_VALUE(RetCode,TA_BAD_PARAM,BadParam);
/* Generated */ 
/* Generated */    #endif /* !defined(_JAVA) */
/* Generated */ #endif /* TA_FUNC_NO_RANGE_CHECK */
/* Generated */ 
/**** END GENCODE SECTION 4 - DO NOT DELETE THIS LINE ****/

   /* Insert TA function code here. */

   /* For an explanation of this function, please read:
    *
    * Magazine articles written by Tim Tillson 
    *
    * Essentially, a T3 of time serie 't' is:
    *   EMA1(x,Period) = EMA(x,Period)
    *   EMA2(x,Period) = EMA(EMA1(x,Period),Period)
    *   GD(x,Period,vFactor) = (EMA1(x,Period)*(1+vFactor)) - (EMA2(x,Period)*vFactor)
    *   T3 = GD (GD ( GD(t, Period, vFactor), Period, vFactor), Period, vFactor);
    *
    * T3 offers a moving average with less lags then the
    * traditional EMA.
    *
    * Do not confuse a T3 with EMA3. Both are called "Triple EMA"
    * in the litterature.
    *
    */
   lookbackTotal = 6 * (optInTimePeriod - 1) + TA_GLOBALS_UNSTABLE_PERIOD(TA_FUNC_UNST_T3,T3);
   if( startIdx <= lookbackTotal )
      startIdx = lookbackTotal;

   /* Make sure there is still something to evaluate. */
   if( startIdx > endIdx )
   {
      VALUE_HANDLE_DEREF_TO_ZERO(outNBElement);
      VALUE_HANDLE_DEREF_TO_ZERO(outBegIdx);
      return ENUM_VALUE(RetCode,TA_SUCCESS,Success); 
   }

   VALUE_HANDLE_DEREF(outBegIdx) = startIdx;
   today = startIdx - lookbackTotal;

   k = 2.0/(optInTimePeriod+1.0);
   one_minus_k = 1.0-k;

   /* Initialize e1 */
   tempReal = inReal[today++];
   for( i=optInTimePeriod-1; i > 0 ; i-- ) 
      tempReal += inReal[today++];
   e1 = tempReal / optInTimePeriod;

   /* Initialize e2 */
   tempReal = e1;
   for( i=optInTimePeriod-1; i > 0 ; i-- ) 
   {
      e1 = (k*inReal[today++])+(one_minus_k*e1);
      tempReal += e1;
   }
   e2 = tempReal / optInTimePeriod;

   /* Initialize e3 */
   tempReal = e2;
   for( i=optInTimePeriod-1; i > 0 ; i-- ) 
   {
      e1  = (k*inReal[today++])+(one_minus_k*e1);
      e2  = (k*e1)+(one_minus_k*e2);
      tempReal += e2;
   }
   e3 = tempReal / optInTimePeriod;

   /* Initialize e4 */
   tempReal = e3;
   for( i=optInTimePeriod-1; i > 0 ; i-- ) 
   {
      e1  = (k*inReal[today++])+(one_minus_k*e1);
      e2  = (k*e1)+(one_minus_k*e2);
      e3  = (k*e2)+(one_minus_k*e3);
      tempReal += e3;
   }
   e4 = tempReal / optInTimePeriod;

   /* Initialize e5 */
   tempReal = e4;
   for( i=optInTimePeriod-1; i > 0 ; i-- ) 
   {
      e1  = (k*inReal[today++])+(one_minus_k*e1);
      e2  = (k*e1)+(one_minus_k*e2);
      e3  = (k*e2)+(one_minus_k*e3);
      e4  = (k*e3)+(one_minus_k*e4);
      tempReal += e4;
   }
   e5 = tempReal / optInTimePeriod;

   /* Initialize e6 */
   tempReal = e5;
   for( i=optInTimePeriod-1; i > 0 ; i-- ) 
   {
      e1  = (k*inReal[today++])+(one_minus_k*e1);
      e2  = (k*e1)+(one_minus_k*e2);
      e3  = (k*e2)+(one_minus_k*e3);
      e4  = (k*e3)+(one_minus_k*e4);
      e5  = (k*e4)+(one_minus_k*e5);
      tempReal += e5;
   }
   e6 = tempReal / optInTimePeriod;

   /* Skip the unstable period */
   while( today <= startIdx )
   {
      /* Do the calculation but do not write the output */
      e1  = (k*inReal[today++])+(one_minus_k*e1);
      e2  = (k*e1)+(one_minus_k*e2);
      e3  = (k*e2)+(one_minus_k*e3);
      e4  = (k*e3)+(one_minus_k*e4);
      e5  = (k*e4)+(one_minus_k*e5);
      e6  = (k*e5)+(one_minus_k*e6);
   }

   /* Calculate the constants */
   tempReal = optInVFactor * optInVFactor;
   c1 = -(tempReal * optInVFactor);
   c2 = 3.0 * (tempReal - c1);
   c3 = -6.0 * tempReal - 3.0 * (optInVFactor-c1);
   c4 = 1.0 + 3.0 * optInVFactor - c1 + 3.0 * tempReal;

   /* Write the first output */
   outIdx = 0;
  	outReal[outIdx++] = c1*e6+c2*e5+c3*e4+c4*e3;

   /* Calculate and output the remaining of the range. */
   while( today <= endIdx )
   {
      e1  = (k*inReal[today++])+(one_minus_k*e1);
      e2  = (k*e1)+(one_minus_k*e2);
      e3  = (k*e2)+(one_minus_k*e3);
      e4  = (k*e3)+(one_minus_k*e4);
      e5  = (k*e4)+(one_minus_k*e5);
      e6  = (k*e5)+(one_minus_k*e6);
      outReal[outIdx++] = c1*e6+c2*e5+c3*e4+c4*e3;
   }

   /* Indicates to the caller the number of output
    * successfully calculated.
    */
   VALUE_HANDLE_DEREF(outNBElement) = outIdx;

   return ENUM_VALUE(RetCode,TA_SUCCESS,Success);
}

/**** START GENCODE SECTION 5 - DO NOT DELETE THIS LINE ****/
/* Generated */ 
/* Generated */ #define  USE_SINGLE_PRECISION_INPUT
/* Generated */ #if !defined( _MANAGED ) && !defined( _JAVA )
/* Generated */    #undef   TA_PREFIX
/* Generated */    #define  TA_PREFIX(x) TA_S_##x
/* Generated */ #endif
/* Generated */ #undef   INPUT_TYPE
/* Generated */ #define  INPUT_TYPE float
/* Generated */ #if defined( _MANAGED )
/* Generated */ enum class Core::RetCode Core::T3( int    startIdx,
/* Generated */                                    int    endIdx,
/* Generated */                                    cli::array<float>^ inReal,
/* Generated */                                    int           optInTimePeriod, /* From 2 to 100000 */
/* Generated */                                    double        optInVFactor, /* From 0 to 1 */
/* Generated */                                    [Out]int%    outBegIdx,
/* Generated */                                    [Out]int%    outNBElement,
/* Generated */                                    cli::array<double>^  outReal )
/* Generated */ #elif defined( _JAVA )
/* Generated */ public RetCode t3( int    startIdx,
/* Generated */                    int    endIdx,
/* Generated */                    float        inReal[],
/* Generated */                    int           optInTimePeriod, /* From 2 to 100000 */
/* Generated */                    double        optInVFactor, /* From 0 to 1 */
/* Generated */                    MInteger     outBegIdx,
/* Generated */                    MInteger     outNBElement,
/* Generated */                    double        outReal[] )
/* Generated */ #else
/* Generated */ TA_RetCode TA_S_T3( int    startIdx,
/* Generated */                     int    endIdx,
/* Generated */                     const float  inReal[],
/* Generated */                     int           optInTimePeriod, /* From 2 to 100000 */
/* Generated */                     double        optInVFactor, /* From 0 to 1 */
/* Generated */                     int          *outBegIdx,
/* Generated */                     int          *outNBElement,
/* Generated */                     double        outReal[] )
/* Generated */ #endif
/* Generated */ {
/* Generated */    int outIdx, lookbackTotal;
/* Generated */    int today, i;
/* Generated */    double k, one_minus_k;
/* Generated */    double e1, e2, e3, e4, e5, e6;
/* Generated */    double c1, c2, c3, c4;
/* Generated */    double tempReal;
/* Generated */  #ifndef TA_FUNC_NO_RANGE_CHECK
/* Generated */     if( startIdx < 0 )
/* Generated */        return ENUM_VALUE(RetCode,TA_OUT_OF_RANGE_START_INDEX,OutOfRangeStartIndex);
/* Generated */     if( (endIdx < 0) || (endIdx < startIdx))
/* Generated */        return ENUM_VALUE(RetCode,TA_OUT_OF_RANGE_END_INDEX,OutOfRangeEndIndex);
/* Generated */     #if !defined(_JAVA)
/* Generated */     if( !inReal ) return ENUM_VALUE(RetCode,TA_BAD_PARAM,BadParam);
/* Generated */     #endif 
/* Generated */     if( (int)optInTimePeriod == TA_INTEGER_DEFAULT )
/* Generated */        optInTimePeriod = 5;
/* Generated */     else if( ((int)optInTimePeriod < 2) || ((int)optInTimePeriod > 100000) )
/* Generated */        return ENUM_VALUE(RetCode,TA_BAD_PARAM,BadParam);
/* Generated */     if( optInVFactor == TA_REAL_DEFAULT )
/* Generated */        optInVFactor = 7.000000e-1;
/* Generated */     else if( (optInVFactor < 0.000000e+0) ||  (optInVFactor > 1.000000e+0) )
/* Generated */        return ENUM_VALUE(RetCode,TA_BAD_PARAM,BadParam);
/* Generated */     #if !defined(_JAVA)
/* Generated */     if( !outReal )
/* Generated */        return ENUM_VALUE(RetCode,TA_BAD_PARAM,BadParam);
/* Generated */     #endif 
/* Generated */  #endif 
/* Generated */    lookbackTotal = 6 * (optInTimePeriod - 1) + TA_GLOBALS_UNSTABLE_PERIOD(TA_FUNC_UNST_T3,T3);
/* Generated */    if( startIdx <= lookbackTotal )
/* Generated */       startIdx = lookbackTotal;
/* Generated */    if( startIdx > endIdx )
/* Generated */    {
/* Generated */       VALUE_HANDLE_DEREF_TO_ZERO(outNBElement);
/* Generated */       VALUE_HANDLE_DEREF_TO_ZERO(outBegIdx);
/* Generated */       return ENUM_VALUE(RetCode,TA_SUCCESS,Success); 
/* Generated */    }
/* Generated */    VALUE_HANDLE_DEREF(outBegIdx) = startIdx;
/* Generated */    today = startIdx - lookbackTotal;
/* Generated */    k = 2.0/(optInTimePeriod+1.0);
/* Generated */    one_minus_k = 1.0-k;
/* Generated */    tempReal = inReal[today++];
/* Generated */    for( i=optInTimePeriod-1; i > 0 ; i-- ) 
/* Generated */       tempReal += inReal[today++];
/* Generated */    e1 = tempReal / optInTimePeriod;
/* Generated */    tempReal = e1;
/* Generated */    for( i=optInTimePeriod-1; i > 0 ; i-- ) 
/* Generated */    {
/* Generated */       e1 = (k*inReal[today++])+(one_minus_k*e1);
/* Generated */       tempReal += e1;
/* Generated */    }
/* Generated */    e2 = tempReal / optInTimePeriod;
/* Generated */    tempReal = e2;
/* Generated */    for( i=optInTimePeriod-1; i > 0 ; i-- ) 
/* Generated */    {
/* Generated */       e1  = (k*inReal[today++])+(one_minus_k*e1);
/* Generated */       e2  = (k*e1)+(one_minus_k*e2);
/* Generated */       tempReal += e2;
/* Generated */    }
/* Generated */    e3 = tempReal / optInTimePeriod;
/* Generated */    tempReal = e3;
/* Generated */    for( i=optInTimePeriod-1; i > 0 ; i-- ) 
/* Generated */    {
/* Generated */       e1  = (k*inReal[today++])+(one_minus_k*e1);
/* Generated */       e2  = (k*e1)+(one_minus_k*e2);
/* Generated */       e3  = (k*e2)+(one_minus_k*e3);
/* Generated */       tempReal += e3;
/* Generated */    }
/* Generated */    e4 = tempReal / optInTimePeriod;
/* Generated */    tempReal = e4;
/* Generated */    for( i=optInTimePeriod-1; i > 0 ; i-- ) 
/* Generated */    {
/* Generated */       e1  = (k*inReal[today++])+(one_minus_k*e1);
/* Generated */       e2  = (k*e1)+(one_minus_k*e2);
/* Generated */       e3  = (k*e2)+(one_minus_k*e3);
/* Generated */       e4  = (k*e3)+(one_minus_k*e4);
/* Generated */       tempReal += e4;
/* Generated */    }
/* Generated */    e5 = tempReal / optInTimePeriod;
/* Generated */    tempReal = e5;
/* Generated */    for( i=optInTimePeriod-1; i > 0 ; i-- ) 
/* Generated */    {
/* Generated */       e1  = (k*inReal[today++])+(one_minus_k*e1);
/* Generated */       e2  = (k*e1)+(one_minus_k*e2);
/* Generated */       e3  = (k*e2)+(one_minus_k*e3);
/* Generated */       e4  = (k*e3)+(one_minus_k*e4);
/* Generated */       e5  = (k*e4)+(one_minus_k*e5);
/* Generated */       tempReal += e5;
/* Generated */    }
/* Generated */    e6 = tempReal / optInTimePeriod;
/* Generated */    while( today <= startIdx )
/* Generated */    {
/* Generated */       e1  = (k*inReal[today++])+(one_minus_k*e1);
/* Generated */       e2  = (k*e1)+(one_minus_k*e2);
/* Generated */       e3  = (k*e2)+(one_minus_k*e3);
/* Generated */       e4  = (k*e3)+(one_minus_k*e4);
/* Generated */       e5  = (k*e4)+(one_minus_k*e5);
/* Generated */       e6  = (k*e5)+(one_minus_k*e6);
/* Generated */    }
/* Generated */    tempReal = optInVFactor * optInVFactor;
/* Generated */    c1 = -(tempReal * optInVFactor);
/* Generated */    c2 = 3.0 * (tempReal - c1);
/* Generated */    c3 = -6.0 * tempReal - 3.0 * (optInVFactor-c1);
/* Generated */    c4 = 1.0 + 3.0 * optInVFactor - c1 + 3.0 * tempReal;
/* Generated */    outIdx = 0;
/* Generated */   	outReal[outIdx++] = c1*e6+c2*e5+c3*e4+c4*e3;
/* Generated */    while( today <= endIdx )
/* Generated */    {
/* Generated */       e1  = (k*inReal[today++])+(one_minus_k*e1);
/* Generated */       e2  = (k*e1)+(one_minus_k*e2);
/* Generated */       e3  = (k*e2)+(one_minus_k*e3);
/* Generated */       e4  = (k*e3)+(one_minus_k*e4);
/* Generated */       e5  = (k*e4)+(one_minus_k*e5);
/* Generated */       e6  = (k*e5)+(one_minus_k*e6);
/* Generated */       outReal[outIdx++] = c1*e6+c2*e5+c3*e4+c4*e3;
/* Generated */    }
/* Generated */    VALUE_HANDLE_DEREF(outNBElement) = outIdx;
/* Generated */    return ENUM_VALUE(RetCode,TA_SUCCESS,Success);
/* Generated */ }
/* Generated */ 
/* Generated */ #if defined( _MANAGED )
/* Generated */ }}} // Close namespace TicTacTec.TA.Lib
/* Generated */ #endif
/**** END GENCODE SECTION 5 - DO NOT DELETE THIS LINE ****/

