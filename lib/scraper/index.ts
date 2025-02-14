"use server"


import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractCurrency, extractDescription, extractPrice } from '../utils';
import UserAgent from 'user-agents';
import { log } from 'console';

const userAgent = new UserAgent(); // Cached user-agent instance

// Rate limiting: Ensures requests are spaced out
const RATE_LIMIT_DELAY = 3000; // 3 seconds

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  // Function to generate random headers
  function getHeaders() {
    return {
      'User-Agent': userAgent.toString(),
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Referer': 'https://www.amazon.com/',
    };
  }

  async function fetchWithRateLimit(url: string) {
    await new Promise(res => setTimeout(res, RATE_LIMIT_DELAY)); // Enforce delay between requests
    return await axios.get(url, { headers: getHeaders() });
  }

  try {
    // Fetch the product page with rate limiting
    const response = await fetchWithRateLimit(url);
    const $ = cheerio.load(response.data);

    // Extract the product title
    const title = $('#title').text().trim();
    const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('.a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
      $('a-price.a-text-price')
    );

    const originalPrice = extractPrice(
      $('#priceblock_ourprice').first(),
      $('.a-price.a-text-price span.a-offscreen').first(),
      $('a-size-small aok-offscreen').first(),
      $('#listPrice').first(),
      $('#priceblock_dealprice').first(),
      $('.a-size-base.a-color-price').first()
    );

    const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';
    const images =
      $('#imgBlkFront').attr('data-a-dynamic-image') ||
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}';

    const imageUrls = Object.keys(JSON.parse(images));
    const currency = extractCurrency($('.a-price-symbol'));
    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");
    // const description = extractDescription($); 
    // console.log({title, currentPrice, originalPrice, currency, imageUrls,discountRate})

    // Construct data object with scraped information
    const data = {
      url,
      currency: currency || '$',
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: 'category',
      reviewsCount: 100,
      stars: 4.5,
      isOutOfStock: outOfStock,
      // description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };
    console.log(data);

    return data;
  } catch (error: any) {
    console.error("Failed to fetch product data:", error);
    return null;
  }}

