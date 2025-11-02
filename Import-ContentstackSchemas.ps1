# Contentstack Clothing - Bulk Import PowerShell Script
# Run this script to import all content types to your stack

param(
    [string]$StackApiKey = "bltfe96f37415d9a587",
    [string]$ManagementToken = "cs9cd8c3c984f56c93190a4f61"
)

# Contentstack API Configuration
$BaseUrl = "https://api.contentstack.io/v3"
$Headers = @{
    "api_key" = $StackApiKey
    "authorization" = $ManagementToken
    "Content-Type" = "application/json"
}

# Content Type Schemas (embedded directly in script)
$ContentTypes = @{
    "Men Shirts" = @{
        title = "Men Shirts"
        uid = "men_shirts"
        schema = @(
            @{
                display_name = "Product Name"
                uid = "title"
                data_type = "text"
                mandatory = $true
                unique = $true
                field_metadata = @{ _default = $true; version = 3 }
                multiple = $false
                non_localizable = $false
            },
            @{
                display_name = "Product Images"
                uid = "product_images"
                data_type = "file"
                multiple = $true
                mandatory = $true
                unique = $false
                non_localizable = $false
            },
            @{
                display_name = "Product Description"
                uid = "description"
                data_type = "text"
                field_metadata = @{ allow_rich_text = $true; multiline = $true }
                multiple = $false
                mandatory = $true
                unique = $false
                non_localizable = $false
            },
            @{
                display_name = "Price"
                uid = "price"
                data_type = "number"
                mandatory = $true
                unique = $false
                non_localizable = $false
            },
            @{
                display_name = "Sale Price"
                uid = "sale_price"
                data_type = "number"
                mandatory = $false
                unique = $false
                non_localizable = $false
            },
            @{
                display_name = "Fabric"
                uid = "fabric"
                data_type = "text"
                display_type = "dropdown"
                enum = @{
                    advanced = $false
                    choices = @(
                        @{ value = "Cotton" },
                        @{ value = "Linen" },
                        @{ value = "Silk" },
                        @{ value = "Wool" },
                        @{ value = "Cotton Blend" }
                    )
                }
                multiple = $false
                mandatory = $true
                unique = $false
                non_localizable = $false
            },
            @{
                display_name = "Fitting"
                uid = "fitting"
                data_type = "text"
                display_type = "dropdown"
                enum = @{
                    advanced = $false
                    choices = @(
                        @{ value = "Slim Fit" },
                        @{ value = "Regular Fit" },
                        @{ value = "Relaxed Fit" },
                        @{ value = "Tailored Fit" }
                    )
                }
                multiple = $false
                mandatory = $true
                unique = $false
                non_localizable = $false
            },
            @{
                display_name = "Available Sizes"
                uid = "sizes"
                data_type = "text"
                display_type = "dropdown"
                enum = @{
                    advanced = $false
                    choices = @(
                        @{ value = "XS" },
                        @{ value = "S" },
                        @{ value = "M" },
                        @{ value = "L" },
                        @{ value = "XL" },
                        @{ value = "XXL" }
                    )
                }
                multiple = $true
                mandatory = $true
                unique = $false
                non_localizable = $false
            },
            @{
                display_name = "Available Colors"
                uid = "colors"
                data_type = "text"
                multiple = $true
                mandatory = $true
                unique = $false
                non_localizable = $false
            },
            @{
                display_name = "SKU"
                uid = "sku"
                data_type = "text"
                mandatory = $true
                unique = $true
                non_localizable = $false
            },
            @{
                display_name = "In Stock"
                uid = "in_stock"
                data_type = "boolean"
                mandatory = $true
                unique = $false
                non_localizable = $false
            },
            @{
                display_name = "Featured Product"
                uid = "featured"
                data_type = "boolean"
                mandatory = $false
                unique = $false
                non_localizable = $false
            }
        )
        options = @{
            is_page = $false
            singleton = $false
            title = "title"
        }
    }
    
    "Men Jackets" = @{
        title = "Men Jackets"
        uid = "men_jackets"
        schema = @(
            @{
                display_name = "Product Name"
                uid = "title"
                data_type = "text"
                mandatory = $true
                unique = $true
                field_metadata = @{ _default = $true; version = 3 }
                multiple = $false
                non_localizable = $false
            },
            @{
                display_name = "Product Images"
                uid = "product_images"
                data_type = "file"
                multiple = $true
                mandatory = $true
                unique = $false
                non_localizable = $false
            },
            @{
                display_name = "Product Description"
                uid = "description"
                data_type = "text"
                field_metadata = @{ allow_rich_text = $true; multiline = $true }
                multiple = $false
                mandatory = $true
                unique = $false
                non_localizable = $false
            },
            @{
                display_name = "Price"
                uid = "price"
                data_type = "number"
                mandatory = $true
                unique = $false
                non_localizable = $false
            },
            @{
                display_name = "Jacket Type"
                uid = "jacket_type"
                data_type = "text"
                display_type = "dropdown"
                enum = @{
                    advanced = $false
                    choices = @(
                        @{ value = "Blazer" },
                        @{ value = "Bomber" },
                        @{ value = "Leather Jacket" },
                        @{ value = "Denim Jacket" }
                    )
                }
                multiple = $false
                mandatory = $true
                unique = $false
                non_localizable = $false
            },
            @{
                display_name = "Available Sizes"
                uid = "sizes"
                data_type = "text"
                display_type = "dropdown"
                enum = @{
                    advanced = $false
                    choices = @(
                        @{ value = "XS" },
                        @{ value = "S" },
                        @{ value = "M" },
                        @{ value = "L" },
                        @{ value = "XL" }
                    )
                }
                multiple = $true
                mandatory = $true
                unique = $false
                non_localizable = $false
            },
            @{
                display_name = "SKU"
                uid = "sku"
                data_type = "text"
                mandatory = $true
                unique = $true
                non_localizable = $false
            },
            @{
                display_name = "In Stock"
                uid = "in_stock"
                data_type = "boolean"
                mandatory = $true
                unique = $false
                non_localizable = $false
            }
        )
        options = @{
            is_page = $false
            singleton = $false
            title = "title"
        }
    }
    
    "Handbags" = @{
        title = "Handbags"
        uid = "handbags"
        schema = @(
            @{
                display_name = "Product Name"
                uid = "title"
                data_type = "text"
                mandatory = $true
                unique = $true
                field_metadata = @{ _default = $true; version = 3 }
                multiple = $false
                non_localizable = $false
            },
            @{
                display_name = "Product Images"
                uid = "product_images"
                data_type = "file"
                multiple = $true
                mandatory = $true
                unique = $false
                non_localizable = $false
            },
            @{
                display_name = "Product Description"
                uid = "description"
                data_type = "text"
                field_metadata = @{ allow_rich_text = $true; multiline = $true }
                multiple = $false
                mandatory = $true
                unique = $false
                non_localizable = $false
            },
            @{
                display_name = "Price"
                uid = "price"
                data_type = "number"
                mandatory = $true
                unique = $false
                non_localizable = $false
            },
            @{
                display_name = "Bag Type"
                uid = "bag_type"
                data_type = "text"
                display_type = "dropdown"
                enum = @{
                    advanced = $false
                    choices = @(
                        @{ value = "Tote Bag" },
                        @{ value = "Shoulder Bag" },
                        @{ value = "Crossbody Bag" },
                        @{ value = "Clutch" }
                    )
                }
                multiple = $false
                mandatory = $true
                unique = $false
                non_localizable = $false
            },
            @{
                display_name = "Material"
                uid = "material"
                data_type = "text"
                display_type = "dropdown"
                enum = @{
                    advanced = $false
                    choices = @(
                        @{ value = "Genuine Leather" },
                        @{ value = "Faux Leather" },
                        @{ value = "Canvas" },
                        @{ value = "Nylon" }
                    )
                }
                multiple = $false
                mandatory = $true
                unique = $false
                non_localizable = $false
            },
            @{
                display_name = "SKU"
                uid = "sku"
                data_type = "text"
                mandatory = $true
                unique = $true
                non_localizable = $false
            },
            @{
                display_name = "In Stock"
                uid = "in_stock"
                data_type = "boolean"
                mandatory = $true
                unique = $false
                non_localizable = $false
            }
        )
        options = @{
            is_page = $false
            singleton = $false
            title = "title"
        }
    }
}

function Import-ContentType {
    param(
        [string]$Name,
        [hashtable]$ContentTypeData
    )
    
    Write-Host "🚀 Importing $Name..." -ForegroundColor Cyan
    
    try {
        $Body = @{
            content_type = $ContentTypeData
        } | ConvertTo-Json -Depth 10
        
        $Response = Invoke-RestMethod -Uri "$BaseUrl/content_types" -Method POST -Headers $Headers -Body $Body
        
        Write-Host "✅ $Name imported successfully! UID: $($Response.content_type.uid)" -ForegroundColor Green
        return $Response
    }
    catch {
        Write-Host "❌ Error importing $Name : $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "Response: $($_.Exception.Response)" -ForegroundColor Red
        return $null
    }
}

# Main execution
Write-Host "🎯 Starting Contentstack Clothing bulk import..." -ForegroundColor Yellow
Write-Host "Stack: $StackApiKey" -ForegroundColor Gray
Write-Host "=" * 50

$Results = @()

foreach ($ContentType in $ContentTypes.GetEnumerator()) {
    $Result = Import-ContentType -Name $ContentType.Key -ContentTypeData $ContentType.Value
    
    if ($Result) {
        $Results += @{ Name = $ContentType.Key; Status = "Success"; UID = $Result.content_type.uid }
    } else {
        $Results += @{ Name = $ContentType.Key; Status = "Failed"; UID = $null }
    }
    
    # Wait 2 seconds between imports to avoid rate limiting
    Start-Sleep -Seconds 2
}

# Summary
Write-Host "`n📊 IMPORT SUMMARY:" -ForegroundColor Yellow
Write-Host "=" * 20
foreach ($Result in $Results) {
    if ($Result.Status -eq "Success") {
        Write-Host "✅ $($Result.Name) - UID: $($Result.UID)" -ForegroundColor Green
    } else {
        Write-Host "❌ $($Result.Name) - Failed" -ForegroundColor Red
    }
}

$Successful = ($Results | Where-Object { $_.Status -eq "Success" }).Count
Write-Host "`n🎉 $Successful/$($Results.Count) content types imported successfully!" -ForegroundColor Magenta

if ($Successful -eq $Results.Count) {
    Write-Host "`n🔥 ALL CONTENT TYPES IMPORTED! Your Contentstack Clothing site is ready!" -ForegroundColor Green
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Go to Contentstack → Entries" -ForegroundColor White
    Write-Host "2. Start adding your products" -ForegroundColor White
    Write-Host "3. Connect your Next.js website to fetch data" -ForegroundColor White
}

# ------------------------------------------------------------
# Force-update (upsert) Women content types to Men Shirts schema
# ------------------------------------------------------------

function Get-StandardProductSchema {
    $schema = @(
        @{ display_name = "Product Name"; uid = "title"; data_type = "text"; mandatory = $true; unique = $true; field_metadata = @{ _default = $true; version = 3 }; multiple = $false; non_localizable = $false },
        @{ display_name = "Product Images"; uid = "product_images"; data_type = "file"; multiple = $true; mandatory = $true; unique = $false; non_localizable = $false },
        @{ display_name = "Product Description"; uid = "description"; data_type = "text"; field_metadata = @{ allow_rich_text = $true; multiline = $true }; multiple = $false; mandatory = $false; unique = $false; non_localizable = $false },
        @{ display_name = "Price"; uid = "price"; data_type = "number"; mandatory = $false; unique = $false; non_localizable = $false },
        @{ display_name = "Sale Price"; uid = "sale_price"; data_type = "number"; mandatory = $false; unique = $false; non_localizable = $false },
        @{ display_name = "SKU"; uid = "sku"; data_type = "text"; mandatory = $false; unique = $false; non_localizable = $false },
        @{ display_name = "Brand"; uid = "brand"; data_type = "text"; mandatory = $false; unique = $false; non_localizable = $false },
        @{ display_name = "Available Sizes"; uid = "sizes"; data_type = "text"; display_type = "dropdown"; enum = @{ advanced = $false; choices = @(@{ value = "XS" }, @{ value = "S" }, @{ value = "M" }, @{ value = "L" }, @{ value = "XL" }, @{ value = "XXL" }) }; multiple = $true; mandatory = $false; unique = $false; non_localizable = $false },
        @{ display_name = "Available Colors"; uid = "colors"; data_type = "text"; multiple = $true; mandatory = $false; unique = $false; non_localizable = $false },
        @{ display_name = "In Stock"; uid = "in_stock"; data_type = "boolean"; mandatory = $false; unique = $false; non_localizable = $false },
        @{ display_name = "Care Instructions"; uid = "care_instructions"; data_type = "text"; field_metadata = @{ multiline = $true }; multiple = $false; mandatory = $false; unique = $false; non_localizable = $false }
    )
    return $schema
}

function Set-ContentTypeSchema {
    param(
        [string]$Title,
        [string]$Uid
    )

    $ct = @{
        title = $Title
        uid = $Uid
        schema = (Get-StandardProductSchema)
        options = @{ is_page = $false; singleton = $false; title = "title" }
    }

    $Body = @{ content_type = $ct } | ConvertTo-Json -Depth 15

    try {
        $null = Invoke-RestMethod -Uri "$BaseUrl/content_types/$Uid" -Method PUT -Headers $Headers -Body $Body
        Write-Host "✅ Updated schema for $Uid" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Failed updating $Uid : $($_.Exception.Message)" -ForegroundColor Red
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $resp = $reader.ReadToEnd()
            Write-Host $resp -ForegroundColor DarkYellow
        }
    }
}

# Apply to Women sections to match Men Shirts structure
Set-ContentTypeSchema -Title "Women Tops" -Uid "women_tops"
Set-ContentTypeSchema -Title "Women Jackets" -Uid "women_jackets"
Set-ContentTypeSchema -Title "Women Office Wear" -Uid "women_office_wear"
Set-ContentTypeSchema -Title "Women Dresses" -Uid "women_dresses"