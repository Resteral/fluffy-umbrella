-- TargetLootFrame.lua
-- Displays the loot table of the current target next to the TargetFrame

local _, addon = ...

local TargetLootFrame = CreateFrame("Frame", "CoALevelGuideTargetLootFrame", UIParent, "BasicFrameTemplateWithInset")
TargetLootFrame:SetSize(200, 150)
TargetLootFrame:SetPoint("TOPLEFT", TargetFrame, "BOTTOMRIGHT", -20, 20)
TargetLootFrame:Hide() -- Hide by default

-- Title
TargetLootFrame.title = TargetLootFrame:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
TargetLootFrame.title:SetPoint("TOPLEFT", TargetLootFrame, "TOPLEFT", 10, -5)
TargetLootFrame.title:SetText("Known Drops")

-- Container for drop items
TargetLootFrame.itemFrames = {}

local function CreateItemFrame(index)
    local frame = CreateFrame("Frame", nil, TargetLootFrame)
    frame:SetSize(180, 24)
    if index == 1 then
        frame:SetPoint("TOPLEFT", TargetLootFrame, "TOPLEFT", 10, -30)
    else
        frame:SetPoint("TOPLEFT", TargetLootFrame.itemFrames[index-1], "BOTTOMLEFT", 0, -5)
    end

    local icon = frame:CreateTexture(nil, "ARTWORK")
    icon:SetSize(20, 20)
    icon:SetPoint("LEFT", frame, "LEFT", 0, 0)
    
    local text = frame:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
    text:SetPoint("LEFT", icon, "RIGHT", 5, 0)
    text:SetJustifyH("LEFT")

    frame.icon = icon
    frame.text = text
    return frame
end

local function UpdateLootDisplay(npcID)
    local lootTable = CoALevelGuide_LootTables and CoALevelGuide_LootTables[npcID]
    
    -- Hide all existing item frames first
    for _, itemFrame in ipairs(TargetLootFrame.itemFrames) do
        itemFrame:Hide()
    end

    if not lootTable or #lootTable == 0 then
        TargetLootFrame:Hide()
        return
    end

    -- Show and populate
    TargetLootFrame:Show()
    TargetLootFrame:SetHeight(40 + (#lootTable * 29)) -- Dynamically resize based on items

    for i, drop in ipairs(lootTable) do
        if not TargetLootFrame.itemFrames[i] then
            TargetLootFrame.itemFrames[i] = CreateItemFrame(i)
        end
        
        local itemFrame = TargetLootFrame.itemFrames[i]
        local itemName, itemLink, itemRarity, itemLevel, itemMinLevel, itemType, itemSubType, itemStackCount, itemEquipLoc, itemTexture = GetItemInfo(drop.id)
        
        if itemName then
            itemFrame.icon:SetTexture(itemTexture)
            itemFrame.text:SetText(itemLink .. " (" .. drop.chance .. "%)")
        else
            -- Item not cached yet, show ID and standard icon
            itemFrame.icon:SetTexture("Interface\\Icons\\INV_Misc_QuestionMark")
            itemFrame.text:SetText("Item #" .. drop.id .. " (" .. drop.chance .. "%)")
        end
        
        itemFrame:Show()
    end
end

-- Event handling
TargetLootFrame:RegisterEvent("PLAYER_TARGET_CHANGED")
TargetLootFrame:SetScript("OnEvent", function(self, event, ...)
    if event == "PLAYER_TARGET_CHANGED" then
        if UnitExists("target") and not UnitIsPlayer("target") then
            local guid = UnitGUID("target")
            if guid then
                -- WotLK GUID parsing for NPC ID (characters 9 to 12)
                local npcID = tonumber(string.sub(guid, 9, 12), 16)
                UpdateLootDisplay(npcID)
            else
                TargetLootFrame:Hide()
            end
        else
            TargetLootFrame:Hide()
        end
    end
end)
