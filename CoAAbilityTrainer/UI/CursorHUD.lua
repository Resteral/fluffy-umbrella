-- ============================================================
-- CoAAbilityTrainer - Cursor HUD (Attach Health & Buffs to Cursor)
-- Tiny sleek vital bars and proc indicators floating next to cursor
-- ============================================================

CoAAT_CursorHUD = {}

local _frame = nil
local _healthBar = nil
local _mpBar = nil
local _buffs = {}

function CoAAT_CursorHUD.Build(parent)
    local f = CreateFrame("Frame", "CoAATCursorHUDFrame", UIParent)
    f:SetSize(46, 22)
    f:SetFrameStrata("TOOLTIP")

    -- Tiny health bar
    local hp = CreateFrame("StatusBar", nil, f)
    hp:SetSize(44, 4)
    hp:SetPoint("TOP", f, "TOP", 0, 0)
    hp:SetMinMaxValues(0, 100)
    hp:SetValue(100)

    local hpTex = hp:CreateTexture(nil, "ARTWORK")
    hpTex:SetTexture("Interface\\TargetingFrame\\UI-TargetingFrame-BarFill")
    hp:SetStatusBarTexture(hpTex)
    hp:SetStatusBarColor(0.2, 0.8, 0.4, 0.9)

    local hpBG = hp:CreateTexture(nil, "BACKGROUND")
    hpBG:SetAllPoints()
    hpBG:SetTexture(0, 0, 0, 0.7)

    _healthBar = hp

    -- Tiny resource bar
    local mp = CreateFrame("StatusBar", nil, f)
    mp:SetSize(44, 3)
    mp:SetPoint("TOP", hp, "BOTTOM", 0, -2)
    mp:SetMinMaxValues(0, 100)
    mp:SetValue(100)

    local mpTex = mp:CreateTexture(nil, "ARTWORK")
    mpTex:SetTexture("Interface\\TargetingFrame\\UI-TargetingFrame-BarFill")
    mp:SetStatusBarTexture(mpTex)
    mp:SetStatusBarColor(0.2, 0.5, 1.0, 0.9)

    local mpBG = mp:CreateTexture(nil, "BACKGROUND")
    mpBG:SetAllPoints()
    mpBG:SetTexture(0, 0, 0, 0.7)

    _mpBar = mp

    -- Tiny buff/proc indicators (up to 3 small square icons below bars)
    for i = 1, 3 do
        local icon = f:CreateTexture(nil, "OVERLAY")
        icon:SetSize(10, 10)
        icon:SetPoint("TOPLEFT", mp, "BOTTOMLEFT", (i - 1) * 12, -2)
        icon:SetTexture("Interface\\Icons\\Spell_Nature_Rejuvenation")
        icon:Hide()
        _buffs[i] = icon
    end

    _frame = f

    -- Update loop
    _frame:SetScript("OnUpdate", function(self, dt)
        if not CoAAT_DB or not CoAAT_DB.showCursorHUD then
            self:Hide()
            return
        end

        -- Check if dead or out of combat (optional hide)
        if UnitIsDeadOrGhost("player") then
            self:SetAlpha(0)
            return
        else
            self:SetAlpha(1)
        end

        -- Attach to cursor
        local x, y = GetCursorPosition()
        local scale = UIParent:GetEffectiveScale()
        if scale > 0 then
            self:SetPoint("CENTER", UIParent, "BOTTOMLEFT", (x / scale) + 20, (y / scale) - 20)
        end

        -- Update stats
        local hpVal = UnitHealth("player") or 0
        local maxHp = UnitHealthMax("player") or 1
        _healthBar:SetValue((hpVal / maxHp) * 100)

        local powerType = UnitPowerType("player") or 0
        local mpVal = UnitPower("player") or 0
        local maxMp = UnitPowerMax("player") or 1
        _mpBar:SetMinMaxValues(0, maxMp)
        _mpBar:SetValue(mpVal)

        -- Resource color
        if powerType == 1 then
            _mpBar:SetStatusBarColor(1.0, 0.2, 0.2, 0.9)
        elseif powerType == 3 then
            _mpBar:SetStatusBarColor(1.0, 0.8, 0.2, 0.9)
        elseif powerType == 6 then
            _mpBar:SetStatusBarColor(0.2, 0.8, 1.0, 0.9)
        else
            _mpBar:SetStatusBarColor(0.2, 0.5, 1.0, 0.9)
        end

        -- Scan player buffs/procs to display (e.g. showing active proc icons)
        local buffIndex = 1
        for i = 1, 3 do _buffs[i]:Hide() end

        for i = 1, 40 do
            local name, _, icon = UnitBuff("player", i)
            if not name then break end
            
            -- Only show important buffs/procs that match custom trainer abilities
            if icon and (name:find("Felfury") or name:find("proc") or name:find("Glow") or name:find("Empower") or name:find("Surge") or name:find("Presence") or name:find("Frenzy")) then
                if _buffs[buffIndex] then
                    _buffs[buffIndex]:SetTexture(icon)
                    _buffs[buffIndex]:Show()
                    buffIndex = buffIndex + 1
                    if buffIndex > 3 then break end
                end
            end
        end
    end)

    f:Hide()
end

function CoAAT_CursorHUD.Refresh()
    if not _frame then return end
    if CoAAT_DB and CoAAT_DB.showCursorHUD then
        _frame:Show()
    else
        _frame:Hide()
    end
end
