<?php

namespace AppBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\Document(collection="chains")
 */
class ChainDocument
{
    /**
     * @MongoDB\Id(strategy="UUID")
     */
    protected $id;

    /**
     * @MongoDB\Field(type="string")
     */
    protected $link;

    /**
     * @MongoDB\Field(type="boolean")
     */
    protected $modified;

    /**
     * @MongoDB\Field(type="raw")
     */
    protected $units;

    /**
     * @MongoDB\Field(type="raw")
     */
    protected $result;

    /**
     * Get id
     *
     * @return custom_id $id
     */
    public function getId()
    {
        return $this->id;
    }

    public function __construct() {
        $this->createdAt = new \Datetime();
        $this->status = "created";
    }

    /**
     * Set link
     *
     * @param string $link
     * @return self
     */
    public function setLink($link)
    {
        $this->link = $link;
        return $this;
    }

    /**
     * Get link
     *
     * @return string $link
     */
    public function getLink()
    {
        return $this->link;
    }

    /**
     * Set units
     *
     * @param raw $units
     * @return self
     */
    public function setUnits($units)
    {
        $this->units = $units;
        return $this;
    }

    /**
     * Get units
     *
     * @return raw $units
     */
    public function getUnits()
    {
        return $this->units;
    }

    /**
     * Set modified
     *
     * @param boolean $modified
     * @return self
     */
    public function setModified($modified)
    {
        $this->modified = $modified;
        return $this;
    }

    /**
     * Get modified
     *
     * @return boolean $modified
     */
    public function getModified()
    {
        return $this->modified;
    }

    /**
     * Set result
     *
     * @param string $result
     * @return self
     */
    public function setResult($result)
    {
        $this->result = $result;
        return $this;
    }

    /**
     * Get result
     *
     * @return string $result
     */
    public function getResult()
    {
        return $this->result;
    }
}
